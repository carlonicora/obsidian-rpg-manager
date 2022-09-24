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

export class TimelineView extends AbstractRpgManagerView {
	protected viewType: string = ViewType.Timeline.toString();
	protected displayText = 'RPG Manager Timeline';
	public icon = 'd20';

	private campaignId: IdInterface;

	private elements: Array<TimelineElementResponseInterface>;

	public initialise(
		params: Array<any>,
	): void {
		this.campaignId = params[0];

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
		const timeline = this.rpgmContentEl.createDiv({cls: 'rpgm-timeline'});

		const ul = timeline.createEl('ul');

		this.elements.forEach((timeline: TimelineElementResponseInterface) => {
			const li = ul.createEl('li');

			const timeContainer = li.createDiv({cls: 'event-time-container'});
			timeContainer.createDiv({cls: 'event-time', text: timeline.date + (timeline.time !== '00:00' ? '\n' + timeline.time : '')});

			const type = timeContainer.createDiv({cls: 'event-type', text: timeline.type});
			const bullet = li.createDiv({cls: 'bullet'});

			switch (timeline.type){
				case "birth":
					type.addClass('green');
					bullet.addClass('green');
					break;
				case "death":
					type.addClass('red');
					bullet.addClass('red');
					break;
				case "act":
					type.addClass('blue');
					bullet.addClass('blue');
					break;
				case "clue":
					type.addClass('purple');
					bullet.addClass('purple');
					break;
			}

			const details = li.createDiv({cls: 'event-details'});

			const fileLink = details.createEl('h3');

			const file: TAbstractFile|null = this.app.vault.getAbstractFileByPath(timeline.link);
			if (file !== null && file instanceof TFile) {
				fileLink.createEl('a', {text: file.basename, href: '#'})
					.addEventListener("click", () => {
						this.app.workspace.getLeaf(false).openFile(file);
					});
			}
			const synopsis = details.createSpan();

			MarkdownRenderer.renderMarkdown(
				timeline.synopsis,
				synopsis,
				'',
				null as unknown as Component,
			);

			this.updateInternalLinks(synopsis);
		});

		return;
	}
}
