import {AbstractRpgManagerView} from "../abstracts/AbstractRpgManagerView";
import {ViewType} from "../enums/ViewType";
import {ComponentType} from "../enums/ComponentType";
import {IdInterface} from "../interfaces/IdInterface";
import {TimelineElementResponseInterface} from "../interfaces/response/subModels/TimelineElementResponseInterface";
import {Component, MarkdownRenderer, TAbstractFile, TFile} from "obsidian";
import {ResponseTimelineElement} from "../responses/ResponseTimelineElement";
import {SorterComparisonElement} from "../database/SorterComparisonElement";
import {CampaignV2Interface} from "../_dbV2/components/interfaces/CampaignV2Interface";
import {EventV2Interface} from "../_dbV2/components/interfaces/EventV2Interface";
import {ClueV2Interface} from "../_dbV2/components/interfaces/ClueV2Interface";
import {CharacterV2Interface} from "../_dbV2/components/interfaces/CharacterV2Interface";
import {SessionV2Interface} from "../_dbV2/components/interfaces/SessionV2Interface";
import {SceneV2Interface} from "../_dbV2/components/interfaces/SceneV2Interface";

export class TimelineView extends AbstractRpgManagerView {
	protected viewType: string = ViewType.Timeline.toString();
	protected displayText = 'RPG Manager Timeline';
	public icon = 'd20';

	private campaignId: IdInterface;
	private campaign: CampaignV2Interface;

	private elements: Array<TimelineElementResponseInterface>;

	public initialise(
		params: Array<any>,
	): void {
		this.campaignId = params[0];
		this.campaign = this.database.readSingle<CampaignV2Interface>(ComponentType.Campaign, this.campaignId);

		super.initialise([]);

		this.elements = [];

		this.database.read<EventV2Interface>(
			(event: EventV2Interface) =>
				event.id.type === ComponentType.Event &&
				event.id.campaignId === this.campaignId.id &&
				event.date != null,
		).forEach((event: EventV2Interface) => {
			if (event.date !== undefined) {
				let time = (<Date>event.date).toLocaleTimeString();
				time = time.substring(0, time.length - 3);
				this.elements.push(
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

		this.database.read<ClueV2Interface>(
			(clue: ClueV2Interface) =>
				clue.id.type === ComponentType.Clue &&
				clue.id.campaignId === this.campaignId.id &&
				clue.found != null,
		).forEach((clue: ClueV2Interface) => {
			if (clue.found != null) {
				this.elements.push(
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

		this.database.read<CharacterV2Interface>(
			(character: CharacterV2Interface) =>
				((ComponentType.Character | ComponentType.NonPlayerCharacter) & character.id.type) === character.id.type &&
				character.id.campaignId === this.campaignId.id &&
				character.death != null,
		).forEach((character: CharacterV2Interface) => {
			if (character.death !== undefined) {
				this.elements.push(
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

		const sessions = this.database.read<SessionV2Interface>(
			(session: SessionV2Interface) =>
				ComponentType.Session === session.id.type &&
				session.id.campaignId === this.campaignId.id
		);

		sessions.forEach((session: SessionV2Interface) => {
			const scenes = this.database.read<SceneV2Interface>(
				(scene: SceneV2Interface) =>
					scene.id.type === ComponentType.Scene &&
					scene.id.campaignId === this.campaignId.id &&
					scene.id.sessionId === session.id.sessionId &&
					scene.date != null
			).sort(
				this.factories.sorter.create<SceneV2Interface>([
					new SorterComparisonElement((scene: SceneV2Interface) => scene.date)
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
						session.file.path,
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

			const header = bannerContainer.createDiv({cls: 'rpgm-header'});
			header.style.backgroundImage = 'url(\'' + this.campaign.image + '\')';

			const overlay = header.createDiv({cls: 'rpgm-header-overlay'});
			overlay.createDiv({cls: 'rpgm-header-title', text: 'Timeline'});

			overlay.createDiv({cls: 'rpgm-campaign-name', text: this.campaign.file.basename});
			overlay.createDiv({cls: 'rpgm-current-date', text: (this.campaign.date !== undefined ? this.campaign.date.toDateString() : '')});
		} else {
			this.rpgmContentEl.createEl('h1', {text: this.campaign.file.basename});
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
