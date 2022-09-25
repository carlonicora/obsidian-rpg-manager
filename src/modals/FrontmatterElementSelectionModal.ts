import {AbstractRpgManagerModal} from "../abstracts/AbstractRpgManagerModal";
import {App} from "obsidian";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {RecordType} from "../enums/RecordType";
import {SorterComparisonElement} from "../database/SorterComparisonElement";
import {SorterType} from "../enums/SorterType";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export class FrontmatterElementSelectionModal extends AbstractRpgManagerModal {
	private listEl: HTMLUListElement;
	private currentElementEl: HTMLSpanElement;


	constructor(
		app: App,
		private currentElement: RecordInterface,
	) {
		super(app);
	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();
		contentEl.addClass('rpgm-modal');

		contentEl.createEl('h2', {text: 'Scene Selector'});

		const elementsEl = contentEl.createDiv({cls:'rpgm-elements'});
		const elementsHeaderEl = elementsEl.createDiv({cls: 'rpgm-elements-header'});

		const elementsContainerEl = elementsEl.createDiv({cls: 'rpgm-elements-container'});
		this.listEl = elementsContainerEl.createEl('ul');

		this.addNavigators(
			[
				RecordType.Subplot,
				RecordType.Event,
				RecordType.NonPlayerCharacter,
				RecordType.Character,
				RecordType.Faction,
				RecordType.Music,
				RecordType.Location,
				RecordType.Clue,
			],
			elementsHeaderEl,
		);
	}

	private addNavigators(
		recortTypes: Array<RecordType>,
		elementHeaderEl: HTMLDivElement,
	): void {
		for (let index=0; index<recortTypes.length; index++){
			const headerEl = elementHeaderEl.createEl('span', {text: RecordType[recortTypes[index]] + 's'});

			if (index === 0){
				headerEl.addClasses(['first', 'selected']);
				this.addElementsToList(recortTypes[index], headerEl);
			}

			if (index === recortTypes.length -1){
				headerEl.addClass('last');
			}

			headerEl.addEventListener('click', () => {
				this.addElementsToList(recortTypes[index], headerEl);
			});
		}
	}

	private addElementsToList(
		type: RecordType,
		headerEl: HTMLSpanElement,
	): void {
		if (headerEl === this.currentElementEl) return;

		if (this.currentElementEl !== undefined) this.currentElementEl.removeClass('selected');

		this.currentElementEl = headerEl;
		this.currentElementEl.addClass('selected');

		this.listEl.empty();

		const records: Array<RecordInterface> = this.database.readList<RecordInterface>(type, this.currentElement.id);

		records.sort(
			this.factories.sorter.create<RecordInterface>([
				new SorterComparisonElement((data: RecordInterface) => data.existsInRelationships(this.currentElement.relationships), SorterType.Descending),
				new SorterComparisonElement((data: RecordInterface) => data.file.stat.mtime, SorterType.Descending),
			])
		)

		records.forEach((data: RecordInterface) => {
			if (data.id !== this.currentElement.id) {
				const itemEl = this.listEl.createEl('li');

				const checkboxDiv = itemEl.createDiv();
				const checkbox = checkboxDiv.createEl('input');
				checkbox.type = 'checkbox';
				checkbox.value = data.path;
				checkbox.id = data.name;

				checkbox.addEventListener('change', () => {
					this.addOrRemoveElementRelationship(checkbox, data);
				});

				let description: string = data.name;
				if (data.existsInRelationships(this.currentElement.relationships)) {
					checkbox.checked = true;

					const relationship: RelationshipInterface | undefined = this.currentElement.relationships.get(data.name);
					if (relationship !== undefined && relationship.description !== '') {
						description += ' (WARNING: removing this relationship will delete its description)';
					}
				}

				const checkboxLabel = checkboxDiv.createEl('label', {text: description});
				checkboxLabel.htmlFor = data.name;
			}
		});
	}

	private addOrRemoveElementRelationship(
		checkboxEl: HTMLInputElement,
		data: RecordInterface,
	): void {
		const map: Map<string, string> = new Map<string, string>();
		map.set('[[' + data.name + ']]', '""');

		if (checkboxEl.checked) {
			console.log('ADDING')
			this.factories.frontmatter.update(this.currentElement.file, map);
		} else {
			console.log('REMOVE')
			this.factories.frontmatter.remove(this.currentElement.file, map);
		}
	}

	onClose() {
		super.onClose();
	}
}
