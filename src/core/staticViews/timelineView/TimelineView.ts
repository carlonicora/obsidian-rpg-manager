import {ComponentType} from "../../enums/ComponentType";
import {IdInterface} from "../../../services/idService/interfaces/IdInterface";
import {Component, MarkdownRenderer, TAbstractFile, TFile, View, WorkspaceLeaf} from "obsidian";
import {CampaignInterface} from "../../../components/campaign/interfaces/CampaignInterface";
import {EventInterface} from "../../../components/event/interfaces/EventInterface";
import {ClueInterface} from "../../../components/clue/interfaces/ClueInterface";
import {CharacterInterface} from "../../../components/character/interfaces/CharacterInterface";
import {SessionInterface} from "../../../components/session/interfaces/SessionInterface";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {DateService} from "../../../services/dateService/DateService";
import {TimelineElementInterface} from "./interfaces/TimelineElementInterface";
import {StaticViewType} from "../../../managers/staticViewsManager/enums/StaticViewType";
import {AbstractStaticView} from "../../../managers/staticViewsManager/abstracts/AbstractStaticView";
import {TimelineElement} from "./TimelineElement";
import {SorterService} from "../../../services/sorterService/SorterService";
import {SorterComparisonElement} from "../../../services/sorterService/SorterComparisonElement";

export class TimelineView extends AbstractStaticView implements View {
	protected viewType: string = StaticViewType.Timeline.toString();
	protected displayText = 'RPG Manager Timeline';
	public icon = 'd20';

	private _campaignId: IdInterface;
	private _campaign: CampaignInterface;

	private _elements: TimelineElementInterface[];

	constructor(
		api: RpgManagerApiInterface,
		leaf: WorkspaceLeaf,
	) {
		super(api, leaf);
	}

	public initialise(
		params: any[],
	): void {
		this._campaignId = params[0];
		this._campaign = this.api.database.readSingle<CampaignInterface>(ComponentType.Campaign, this._campaignId);

		super.initialise([]);

		this._elements = [];

		this.api.database.read<EventInterface>(
			(event: EventInterface) =>
				event.id.type === ComponentType.Event &&
				event.id.campaignId === this._campaignId.id &&
				event.date != null,
		).forEach((event: EventInterface) => {
			if (event.date !== undefined) {
				let time = '';
				if (!event.date.isFantasyCalendar) {
					time = ((<Date>event.date.date)).toLocaleTimeString();
					time = time.substring(0, time.length - 3);
				}
				this._elements.push(
					new TimelineElement(
						event.date.date,
						this.api.service(DateService).getReadableDate(event.date, event) ?? '',
						time,
						'event',
						event.synopsis ?? '',
						event.file.path,
					)
				);
			}
		});

		this.api.database.read<ClueInterface>(
			(clue: ClueInterface) =>
				clue.id.type === ComponentType.Clue &&
				clue.id.campaignId === this._campaignId.id &&
				clue.found != null,
		).forEach((clue: ClueInterface) => {
			if (clue.found != null) {
				const clueFound = clue.found.date;
				this._elements.push(
					new TimelineElement(
						clueFound,
						this.api.service(DateService).getReadableDate(clue.found, clue) ?? '',
						'00:00',
						'clue',
						clue.synopsis ?? '',
						clue.file.path,
					)
				);
			}
		});

		this.api.database.read<CharacterInterface>(
			(character: CharacterInterface) =>
				((ComponentType.Character | ComponentType.NonPlayerCharacter) & character.id.type) === character.id.type &&
				character.id.campaignId === this._campaignId.id &&
				character.death != null,
		).forEach((character: CharacterInterface) => {
			if (character.death !== undefined) {
				this._elements.push(
					new TimelineElement(
						character.death.date,
						this.api.service(DateService).getReadableDate(character.death, character) ?? '',
						'00:00',
						'death',
						character.synopsis ?? '',
						character.file.path,
					)
				);
			}
		});

		const sessions = this.api.database.read<SessionInterface>(
			(session: SessionInterface) =>
				ComponentType.Session === session.id.type &&
				session.id.campaignId === this._campaignId.id
		);

		sessions.forEach((session: SessionInterface) => {
			const scenes = this.api.database.read<SceneInterface>(
				(scene: SceneInterface) =>
					scene.id.type === ComponentType.Scene &&
					scene.id.campaignId === this._campaignId.id &&
					scene.id.sessionId === session.id.sessionId &&
					scene.date != null
			).sort(
				this.api.service(SorterService).create<SceneInterface>([
					new SorterComparisonElement((scene: SceneInterface) => scene.date)
				])
			);

			const sessionDate = scenes[0]?.date;
			if (sessionDate != null){
				this._elements.push(
					new TimelineElement(
						sessionDate.date,
						this.api.service(DateService).getReadableDate(sessionDate, session) ?? '',
						'00:00',
						'session',
						session.synopsis ?? '',
						session.file.path,
					)
				);
			}
		});

		this._elements.sort(this.api.service(SorterService).create<TimelineElementInterface>([
			new SorterComparisonElement((data: TimelineElementInterface) => data.fullDate)
		]));
	}

	public async render(
	): Promise<void> {
		this.rpgmContentEl.empty();

		if (this._campaign.images.length > 0) {
			const bannerContainer = this.rpgmContentEl.createDiv({cls: 'rpg-container'});

			const header = bannerContainer.createDiv({cls: 'rpgm-header'});
			header.style.backgroundImage = 'url(\'' + this._campaign.images[0].src + '\')';

			const overlay = header.createDiv({cls: 'rpgm-header-overlay'});
			overlay.createDiv({cls: 'rpgm-header-title', text: 'Timeline'});

			overlay.createDiv({cls: 'rpgm-campaign-name', text: this._campaign.file.basename});
			const campaignDate = this.api.service(DateService).getReadableDate(this._campaign.date, this._campaign) ?? '';
			overlay.createDiv({cls: 'rpgm-current-date', text: (campaignDate !== undefined ? campaignDate : '')});
		} else {
			this.rpgmContentEl.createEl('h1', {text: this._campaign.file.basename});
		}

		const timelineEl = this.rpgmContentEl.createDiv({cls: 'rpgm-new-timeline'});
		const listEl = timelineEl.createEl('ul');

		this._elements.forEach((timeline: TimelineElementInterface) => {
			const itemEl = listEl.createEl('li', {cls: timeline.type});
			const contentEl = itemEl.createDiv({cls: 'content'});

			/** DATE **/
			contentEl.createEl('span', {cls: timeline.type, text: timeline.type.toString() + ': ' + timeline.date + (timeline.time !== '00:00' ? ' @ ' + timeline.time : '')});

			/** TITLE **/
			const titleEl = contentEl.createEl('h3');
			const file: TAbstractFile|null = this.app.vault.getAbstractFileByPath(timeline.link);
			if (file !== null && file instanceof TFile) {
				titleEl.createEl('a', {text: file.basename, href: '#'})
					.addEventListener("click", () => {
						this.app.workspace.getLeaf(false).openFile(file);
					});
			}

			/** DESCRIPTION **/
			const descriptionEl = contentEl.createDiv();
			MarkdownRenderer.renderMarkdown(
				timeline.synopsis,
				descriptionEl,
				'',
				null as unknown as Component,
			);
			this.updateInternalLinks(descriptionEl);
		});

		return;
	}
}
