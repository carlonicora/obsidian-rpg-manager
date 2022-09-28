import {AbstractRpgManagerView} from "../abstracts/AbstractRpgManagerView";
import {ViewType} from "../enums/ViewType";
import {EventInterface} from "../interfaces/components/EventInterface";
import {ComponentType} from "../enums/ComponentType";
import {IdInterface} from "../interfaces/components/IdInterface";
import {ClueInterface} from "../interfaces/components/ClueInterface";
import {CharacterInterface} from "../interfaces/components/CharacterInterface";
import {TimelineElementResponseInterface} from "../interfaces/response/subModels/TimelineElementResponseInterface";
import {Component, MarkdownRenderer, TAbstractFile, TFile} from "obsidian";
import {ResponseTimelineElement} from "../responses/ResponseTimelineElement";
import {SorterComparisonElement} from "../database/SorterComparisonElement";
import {CampaignInterface} from "../interfaces/components/CampaignInterface";
import {SessionInterface} from "../interfaces/components/SessionInterface";
import {SceneInterface} from "../interfaces/components/SceneInterface";

export class TimelineView extends AbstractRpgManagerView {
	protected viewType: string = ViewType.Timeline.toString();
	protected displayText = 'RPG Manager Timeline';
	public icon = 'd20';

	private campaignId: IdInterface;
	private campaign: CampaignInterface;

	private elements: Array<TimelineElementResponseInterface>;

	public initialise(
		params: Array<any>,
	): void {
		this.campaignId = params[0];
		this.campaign = this.database.readSingle<CampaignInterface>(ComponentType.Campaign, this.campaignId);

		super.initialise([]);

		this.elements = [];

		this.database.read<EventInterface>(
			(event: EventInterface) =>
				event.id.type === ComponentType.Event &&
				event.id.campaignId === this.campaignId.id &&
				event.date != null,
		).forEach((event: EventInterface) => {
			if (event.date !== null) {
				let time = (<Date>event.date).toLocaleTimeString();
				time = time.substring(0, time.length - 3);
				this.elements.push(
					new ResponseTimelineElement(
						event.date,
						(<Date>event.date).toDateString(),
						time,
						'event',
						event.synopsis ?? '',
						event.path,
					)
				);
			}
		});

		this.database.read<ClueInterface>(
			(clue: ClueInterface) =>
				clue.id.type === ComponentType.Clue &&
				clue.id.campaignId === this.campaignId.id &&
				clue.found != null,
		).forEach((clue: ClueInterface) => {
			if (clue.found != null) {
				this.elements.push(
					new ResponseTimelineElement(
						clue.found,
						(<Date>clue.found).toDateString(),
						'00:00',
						'clue',
						clue.synopsis ?? '',
						clue.path,
					)
				)
			}
		});

		this.database.read<CharacterInterface>(
			(character: CharacterInterface) =>
				((ComponentType.Character | ComponentType.NonPlayerCharacter) & character.id.type) === character.id.type &&
				character.id.campaignId === this.campaignId.id &&
				character.death != null,
		).forEach((character: CharacterInterface) => {
			if (character.death !== null) {
				this.elements.push(
					new ResponseTimelineElement(
						character.death,
						(<Date>character.death).toDateString(),
						'00:00',
						'death',
						character.synopsis ?? '',
						character.path,
					)
				)
			}
		});

		const sessions = this.database.read<SessionInterface>(
			(session: SessionInterface) =>
				ComponentType.Session === session.id.type &&
				session.id.campaignId === this.campaignId.id
		);

		sessions.forEach((session: SessionInterface) => {
			const scenes = this.database.read<SceneInterface>(
				(scene: SceneInterface) =>
					scene.id.type === ComponentType.Scene &&
					scene.id.campaignId === this.campaignId.id &&
					scene.sessionId === session.sessionId &&
					scene.date != null
			).sort(
				this.factories.sorter.create<SceneInterface>([
					new SorterComparisonElement((scene: SceneInterface) => scene.date)
				])
			);

			const sessionDate = scenes[0]?.date;
			if (sessionDate != null){
				this.elements.push(
					new ResponseTimelineElement(
						sessionDate,
						(<Date>sessionDate).toDateString(),
						'00:00',
						'session',
						session.synopsis ?? '',
						session.path,
					)
				)
			}
		});

		this.elements.sort(this.factories.sorter.create<TimelineElementResponseInterface>([
			new SorterComparisonElement((data: TimelineElementResponseInterface) => data.fullDate)
		]));
	}

	public async render(
	): Promise<void> {
		this.rpgmContentEl.empty();

		if (this.campaign.image !== null) {
			const bannerContainer = this.rpgmContentEl.createDiv({cls: 'rpg-container'});

			const header = bannerContainer.createDiv({cls: 'rpgm-headers'});
			header.style.backgroundImage = 'url(\'' + this.campaign.image + '\')';

			const overlay = header.createDiv({cls: 'rpgm-headers-overlay'});
			overlay.createDiv({cls: 'rpgm-headers-title', text: 'Timeline'});

			overlay.createDiv({cls: 'rpgm-campaign-name', text: this.campaign.name});
			overlay.createDiv({cls: 'rpgm-current-date', text: (this.campaign.currentDate !== null ? this.campaign.currentDate.toDateString() : '')});
		} else {
			this.rpgmContentEl.createEl('h1', {text: this.campaign.name});
		}

		const timelineEl = this.rpgmContentEl.createDiv({cls: 'rpgm-new-timeline'});
		const listEl = timelineEl.createEl('ul');

		this.elements.forEach((timeline: TimelineElementResponseInterface) => {
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
