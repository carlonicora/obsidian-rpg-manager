import {AbstractRpgManagerView} from "../abstracts/AbstractRpgManagerView";
import {ViewType} from "../enums/ViewType";
import {EventInterface} from "../interfaces/data/EventInterface";
import {RecordType} from "../enums/RecordType";
import {IdInterface} from "../interfaces/data/IdInterface";
import {ClueInterface} from "../interfaces/data/ClueInterface";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {TimelineElementResponseInterface} from "../interfaces/response/TimelineElementResponseInterface";
import {Component, MarkdownRenderer, TAbstractFile, TFile} from "obsidian";
import {TimelineElementResponse} from "../data/responses/TimelineElementResponse";
import {SorterComparisonElement} from "../database/SorterComparisonElement";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";

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
		this.campaign = this.database.readSingle<CampaignInterface>(RecordType.Campaign, this.campaignId);

		super.initialise([]);

		this.elements = [];

		this.database.read<EventInterface>(
			(event: EventInterface) =>
				event.id.type === RecordType.Event &&
				event.id.campaignId === this.campaignId.id &&
				event.date != null,
		).forEach((event: EventInterface) => {
			if (event.date !== null) {
				let time = (<Date>event.date).toLocaleTimeString();
				time = time.substring(0, time.length - 3);
				this.elements.push(
					new TimelineElementResponse(
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
				clue.id.type === RecordType.Clue &&
				clue.id.campaignId === this.campaignId.id &&
				clue.found != null,
		).forEach((clue: ClueInterface) => {
			if (clue.found != null) {
				this.elements.push(
					new TimelineElementResponse(
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
				((RecordType.Character | RecordType.NonPlayerCharacter) & character.id.type) === character.id.type &&
				character.id.campaignId === this.campaignId.id &&
				character.death != null,
		).forEach((character: CharacterInterface) => {
			if (character.death !== null) {
				this.elements.push(
					new TimelineElementResponse(
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

		this.elements.sort(
			this.factories.sorter.create<TimelineElementResponseInterface>([
				new SorterComparisonElement((data: TimelineElementResponseInterface) => {data.date})
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
			const dateEl = contentEl.createEl('span', {cls: timeline.type, text: timeline.type.toString() + ': ' + timeline.date + (timeline.time !== '00:00' ? ' @ ' + timeline.time : '')});

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
