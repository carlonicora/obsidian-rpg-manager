import {AbstractRpgManagerView} from "../abstracts/AbstractRpgManagerView";
import {ViewType} from "./enums/ViewType";
import {ComponentType} from "../components/enums/ComponentType";
import {IdInterface} from "../id/interfaces/IdInterface";
import {TimelineElementResponseInterface} from "../responses/interfaces/TimelineElementResponseInterface";
import {Component, MarkdownRenderer, TAbstractFile, TFile} from "obsidian";
import {ResponseTimelineElement} from "../responses/ResponseTimelineElement";
import {SorterComparisonElement} from "../databases/SorterComparisonElement";
import {CampaignInterface} from "../components/components/campaign/interfaces/CampaignInterface";
import {EventInterface} from "../components/components/event/interfaces/EventInterface";
import {ClueInterface} from "../components/components/clue/interfaces/ClueInterface";
import {CharacterInterface} from "../components/components/character/interfaces/CharacterInterface";
import {SessionInterface} from "../components/components/session/interfaces/SessionInterface";
import {SceneInterface} from "../components/components/scene/interfaces/SceneInterface";

export class TimelineView extends AbstractRpgManagerView {
	protected viewType: string = ViewType.Timeline.toString();
	protected displayText = 'RPG Manager Timeline';
	public icon = 'd20';

	private _campaignId: IdInterface;
	private _campaign: CampaignInterface;

	private _elements: TimelineElementResponseInterface[];

	public initialise(
		params: any[],
	): void {
		this._campaignId = params[0];
		this._campaign = this.database.readSingle<CampaignInterface>(ComponentType.Campaign, this._campaignId);

		super.initialise([]);

		this._elements = [];

		this.database.read<EventInterface>(
			(event: EventInterface) =>
				event.id.type === ComponentType.Event &&
				event.id.campaignId === this._campaignId.id &&
				event.date != null,
		).forEach((event: EventInterface) => {
			if (event.date !== undefined) {
				let time = (<Date>event.date).toLocaleTimeString();
				time = time.substring(0, time.length - 3);
				this._elements.push(
					new ResponseTimelineElement(
						event.date,
						(<Date>event.date).toDateString(),
						time,
						'event',
						event.synopsis ?? '',
						event.file.path,
					)
				);
			}
		});

		this.database.read<ClueInterface>(
			(clue: ClueInterface) =>
				clue.id.type === ComponentType.Clue &&
				clue.id.campaignId === this._campaignId.id &&
				clue.found != null,
		).forEach((clue: ClueInterface) => {
			if (clue.found != null) {
				this._elements.push(
					new ResponseTimelineElement(
						clue.found,
						(<Date>clue.found).toDateString(),
						'00:00',
						'clue',
						clue.synopsis ?? '',
						clue.file.path,
					)
				)
			}
		});

		this.database.read<CharacterInterface>(
			(character: CharacterInterface) =>
				((ComponentType.Character | ComponentType.NonPlayerCharacter) & character.id.type) === character.id.type &&
				character.id.campaignId === this._campaignId.id &&
				character.death != null,
		).forEach((character: CharacterInterface) => {
			if (character.death !== undefined) {
				this._elements.push(
					new ResponseTimelineElement(
						character.death,
						(<Date>character.death).toDateString(),
						'00:00',
						'death',
						character.synopsis ?? '',
						character.file.path,
					)
				)
			}
		});

		const sessions = this.database.read<SessionInterface>(
			(session: SessionInterface) =>
				ComponentType.Session === session.id.type &&
				session.id.campaignId === this._campaignId.id
		);

		sessions.forEach((session: SessionInterface) => {
			const scenes = this.database.read<SceneInterface>(
				(scene: SceneInterface) =>
					scene.id.type === ComponentType.Scene &&
					scene.id.campaignId === this._campaignId.id &&
					scene.id.sessionId === session.id.sessionId &&
					scene.date != null
			).sort(
				this.factories.sorter.create<SceneInterface>([
					new SorterComparisonElement((scene: SceneInterface) => scene.date)
				])
			);

			const sessionDate = scenes[0]?.date;
			if (sessionDate != null){
				this._elements.push(
					new ResponseTimelineElement(
						sessionDate,
						(<Date>sessionDate).toDateString(),
						'00:00',
						'session',
						session.synopsis ?? '',
						session.file.path,
					)
				)
			}
		});

		this._elements.sort(this.factories.sorter.create<TimelineElementResponseInterface>([
			new SorterComparisonElement((data: TimelineElementResponseInterface) => data.fullDate)
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
			overlay.createDiv({cls: 'rpgm-current-date', text: (this._campaign.date !== undefined ? this._campaign.date.toDateString() : '')});
		} else {
			this.rpgmContentEl.createEl('h1', {text: this._campaign.file.basename});
		}

		const timelineEl = this.rpgmContentEl.createDiv({cls: 'rpgm-new-timeline'});
		const listEl = timelineEl.createEl('ul');

		this._elements.forEach((timeline: TimelineElementResponseInterface) => {
			const itemEl = listEl.createEl('li', {cls: timeline.type});
			const contentEl = itemEl.createDiv({cls: 'content'})

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
