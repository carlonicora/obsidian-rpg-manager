import {AbstractRpgManagerModal} from "../abstracts/AbstractRpgManagerModal";
import {App} from "obsidian";
import {ComponentInterface} from "../interfaces/database/ComponentInterface";
import {ComponentType} from "../enums/ComponentType";
import {SorterComparisonElement} from "../database/SorterComparisonElement";
import {SorterType} from "../enums/SorterType";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export class FrontmatterElementSelectionModal extends AbstractRpgManagerModal {
	private listEl: HTMLUListElement;
	private currentElementEl: HTMLSpanElement;


	constructor(
		app: App,
		private currentElement: ComponentInterface,
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
		const elementsHeaderEl = elementsEl.createDiv({cls: 'rpgm-elements-headers'});

		const elementsContainerEl = elementsEl.createDiv({cls: 'rpgm-elements-container'});
		this.listEl = elementsContainerEl.createEl('ul');

		this.addNavigators(
			[
				ComponentType.Subplot,
				ComponentType.Event,
				ComponentType.NonPlayerCharacter,
				ComponentType.Character,
				ComponentType.Faction,
				ComponentType.Music,
				ComponentType.Location,
				ComponentType.Clue,
			],
			elementsHeaderEl,
		);
	}

	private addNavigators(
		recortTypes: Array<ComponentType>,
		elementHeaderEl: HTMLDivElement,
	): void {
		for (let index=0; index<recortTypes.length; index++){
			const headerEl = elementHeaderEl.createEl('span', {text: ComponentType[recortTypes[index]] + 's'});

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
		type: ComponentType,
		headerEl: HTMLSpanElement,
	): void {
		if (headerEl === this.currentElementEl) return;

		if (this.currentElementEl !== undefined) this.currentElementEl.removeClass('selected');

		this.currentElementEl = headerEl;
		this.currentElementEl.addClass('selected');

		this.listEl.empty();

		const records: Array<ComponentInterface> = this.database.readList<ComponentInterface>(type, this.currentElement.id);

		records.sort(
			this.factories.sorter.create<ComponentInterface>([
				new SorterComparisonElement((data: ComponentInterface) => data.existsInRelationships(this.currentElement.relationships), SorterType.Descending),
				new SorterComparisonElement((data: ComponentInterface) => data.file.stat.mtime, SorterType.Descending),
			])
		)

		records.forEach((data: ComponentInterface) => {
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
		data: ComponentInterface,
	): void {
		const map: Map<string, string> = new Map<string, string>();
		map.set('[[' + data.name + ']]', '""');

		if (checkboxEl.checked) {
			this.factories.frontmatter.update(this.currentElement.file, map);
		} else {
			this.factories.frontmatter.remove(this.currentElement.file, map);
		}
	}

	onClose() {
		super.onClose();
	}
}
