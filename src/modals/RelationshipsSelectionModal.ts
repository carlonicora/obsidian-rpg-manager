import {AbstractRpgManagerModal} from "../abstracts/AbstractRpgManagerModal";
import {App, Component, MarkdownRenderer} from "obsidian";
import {ComponentType} from "../components/enums/ComponentType";
import {SorterComparisonElement} from "../databases/SorterComparisonElement";
import {SorterType} from "../databases/enums/SorterType";
import {ComponentInterface} from "../components/interfaces/ComponentInterface";
import {RelationshipInterface} from "../relationships/interfaces/RelationshipInterface";
import {RelationshipType} from "../relationships/enums/RelationshipType";

export class RelationshipsSelectionModal extends AbstractRpgManagerModal {
	private relationshipsEl: HTMLDivElement;

	private availableRelationships: Map<ComponentType, Array<ComponentType>> = new Map<ComponentType, Array<ComponentType>>([
		[ComponentType.Campaign, []],
		[ComponentType.Adventure, [ComponentType.NonPlayerCharacter, ComponentType.Faction, ComponentType.Location, ComponentType.Clue, ComponentType.Event, ComponentType.Character]],
		[ComponentType.Act, [ComponentType.NonPlayerCharacter, ComponentType.Faction, ComponentType.Location, ComponentType.Clue, ComponentType.Event, ComponentType.Character]],
		[ComponentType.Scene, [ComponentType.NonPlayerCharacter, ComponentType.Faction, ComponentType.Location, ComponentType.Clue, ComponentType.Event, ComponentType.Character]],
		[ComponentType.Session, []],
		[ComponentType.Subplot, [ComponentType.NonPlayerCharacter, ComponentType.Faction, ComponentType.Location, ComponentType.Clue, ComponentType.Event, ComponentType.Subplot]],
		[ComponentType.Character, [ComponentType.NonPlayerCharacter, ComponentType.Character, ComponentType.Faction, ComponentType.Location, ComponentType.Clue]],
		[ComponentType.NonPlayerCharacter, [ComponentType.NonPlayerCharacter, ComponentType.Character, ComponentType.Faction, ComponentType.Location, ComponentType.Clue, ComponentType.Event, ComponentType.Subplot]],
		[ComponentType.Clue, [ComponentType.Clue, ComponentType.Event, ComponentType.Location, ComponentType.Faction, ComponentType.NonPlayerCharacter, ComponentType.Subplot]],
		[ComponentType.Event, [ComponentType.Event, ComponentType.Clue, ComponentType.Location, ComponentType.Faction, ComponentType.NonPlayerCharacter, ComponentType.Subplot]],
		[ComponentType.Faction, [ComponentType.Faction, ComponentType.Location, ComponentType.Event, ComponentType.Clue, ComponentType.Subplot]],
		[ComponentType.Location, [ComponentType.Location, ComponentType.Faction, ComponentType.Character, ComponentType.NonPlayerCharacter, ComponentType.Clue, ComponentType.Event]],
		[ComponentType.Music, [ComponentType.Music]],
	]);

	private relationshipTypeAllowedChildren: Map<ComponentType, boolean> = new Map<ComponentType, boolean>([
		[ComponentType.Clue,true],
		[ComponentType.Event,true],
		[ComponentType.Faction,true],
		[ComponentType.Location,true],
		[ComponentType.Music,true],
	]);

	constructor(
		app: App,
		private currentComponent: ComponentInterface,
	) {
		super(app);
	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();
		this.modalEl.style.width = 'var(--modal-max-width)';

		const relationshipsModalEl = contentEl.createDiv({cls: 'rpgm-modal-relationships'})

		relationshipsModalEl.createEl('h2', {text: 'Relationship Selector'});
		relationshipsModalEl.createDiv({text: 'Select the type of component'});

		this.requiredRelationshipType(relationshipsModalEl);
		this.relationshipsEl = relationshipsModalEl.createDiv({cls:'relationships', text: ''});
		this.addElementsToList();
	}

	private requiredRelationshipType(
		contentEl: HTMLElement,
	): void {
		const relationshipTypeSelectorEl: HTMLSelectElement = contentEl.createEl('select');
		relationshipTypeSelectorEl.createEl("option", {
			text: 'Existing Relationships',
			value: '',
		});
		const availableRelationships = this.availableRelationships.get(this.currentComponent.id.type);
		if (availableRelationships !== undefined && availableRelationships.length > 0) {
			availableRelationships.forEach((type: ComponentType) => {
				relationshipTypeSelectorEl.createEl("option", {
					text: ComponentType[type] + 's',
					value: type.toString(),
				});
			});
			relationshipTypeSelectorEl.addEventListener('change', () => {
				this.relationshipsEl.empty();
				let value: ComponentType|undefined = undefined;

				if (relationshipTypeSelectorEl.value !== '') value = (+relationshipTypeSelectorEl.value);
				this.addElementsToList(value);
			});
		}
	}

	private addElementsToList(
		type: ComponentType|undefined = undefined,
	): void {
		const relationshipsTableEl: HTMLTableSectionElement = this.relationshipsEl.createEl('table').createTBody();

		let components: Array<ComponentInterface> = [];
		if (type !== undefined) {
			components = this.database.readList<ComponentInterface>(type, this.currentComponent.id)
				.sort(
					this.factories.sorter.create<ComponentInterface>([
						new SorterComparisonElement((component: ComponentInterface) => this.currentComponent.getRelationships().existsAlready(component), SorterType.Descending),
						new SorterComparisonElement((component: ComponentInterface) => component.file.stat.mtime, SorterType.Descending),
					])
				);
		} else {
			components = this.database.recordset
				.filter((component: ComponentInterface) => this.currentComponent.getRelationships().existsAlready(component))
				.sort(
					this.factories.sorter.create<ComponentInterface>([
						new SorterComparisonElement((component: ComponentInterface) => component.file.stat.mtime, SorterType.Descending),
					])
				);
		}

		components.forEach((component: ComponentInterface) => {
			if (component.id !== this.currentComponent.id) {
				const relationships: Array<RelationshipInterface> = this.currentComponent.getRelationships()
					.filter((relationship: RelationshipInterface) =>
						relationship.component?.file.basename === component.file.basename
					);

				const relationship: RelationshipInterface | undefined = relationships[0] ?? undefined;

				const rowEl: HTMLTableRowElement = relationshipsTableEl.insertRow();

				/** CHECKBOX */
				const checkboxEl = rowEl.insertCell().createEl('input');
				checkboxEl.type = 'checkbox';
				checkboxEl.value = component.file.path;
				checkboxEl.id = component.file.basename;

				if (relationship !== undefined) {
					checkboxEl.checked = true;
					if (relationship.isInContent || relationship.type === RelationshipType.Parent) checkboxEl.disabled = true;
				}

				if (relationship !== undefined) checkboxEl.checked = true;

				/** IMAGE */
				if (component.image != null) {
					const img = new Image(40, 40);

					img.onerror = (evt: Event|string) => {
						rowEl.insertCell();
					};

					img.onload = (evt: Event) => {
						img.style.objectFit = 'cover';
						rowEl.insertCell().append(img as Node);
					};

					img.src = component.image;

				} else {
					rowEl.insertCell();
				}

				/** TYPE SELECTOR */
				const relationshipTypeSelectorEl = this._addRelationshipTypeSelector(
					component,
					relationship,
					rowEl.insertCell(),
					checkboxEl,
				)

				/** DESCRIPTION */
				const titleCell = rowEl.insertCell();
				titleCell.addClass('label');
				const checkboxLabel = titleCell.createEl('label', {text: component.file.basename});
				checkboxLabel.htmlFor = component.file.basename;


				if (relationship !== undefined) {
					if (relationship.isInContent) {
						titleCell.createEl('br');
						titleCell.createSpan({text: 'relationship in the notes cannot be removed'});
					} else if (relationship.type === RelationshipType.Parent) {
						titleCell.createEl('br');
						titleCell.createSpan({text: 'parent element can only be removed from the parent'});
					} else if (relationship.description != undefined && relationship.description !== '') {
						titleCell.createEl('br');
						titleCell.createSpan({text: 'removing this relationship deletes its description'});
					}
				}

				/** SYNOPSIS */
				const synopsisEl = rowEl.insertCell();
				synopsisEl.addClass('description')
				MarkdownRenderer.renderMarkdown(
					(relationship !== undefined && relationship.description != undefined && relationship.description !== '')
						? relationship.description
						: (component.synopsis ?? ''),
					synopsisEl,
					'',
					null as unknown as Component,
				)

				checkboxEl.addEventListener('change', () => {
					this._addOrRemoveElementRelationship(
						checkboxEl,
						relationshipTypeSelectorEl,
						component,
						relationship
					);
				});
			}
		});
	}

	private _addRelationshipTypeSelector(
		component: ComponentInterface,
		relationship: RelationshipInterface|undefined,
		containerEl: HTMLTableCellElement,
		checkboxEl: HTMLInputElement,
	): HTMLSelectElement {
		containerEl.addClass('selector');
		const availableRelationshipsType: Map<RelationshipType, string> = new Map<RelationshipType, string>();

		if (this.currentComponent.id.type !== component.id.type) availableRelationshipsType.set(RelationshipType.Bidirectional, this.factories.relationshipType.createReadableRelationshipType(RelationshipType.Bidirectional));
		availableRelationshipsType.set(RelationshipType.Unidirectional, this.factories.relationshipType.createReadableRelationshipType(RelationshipType.Unidirectional));
		if (this.currentComponent.id.type === component.id.type && this.relationshipTypeAllowedChildren.has(component.id.type)) availableRelationshipsType.set(RelationshipType.Child, this.factories.relationshipType.createReadableRelationshipType(RelationshipType.Child));

		const relationshipTypeSelectorEl: HTMLSelectElement = containerEl.createEl('select');
		if (availableRelationshipsType.size === 1){
			const [singleValue] = availableRelationshipsType.values();
			relationshipTypeSelectorEl.createEl("option", {
				text: singleValue,
				value: singleValue,
			}).selected = true;
		} else {
			let isFirst = true;
			availableRelationshipsType.forEach((relationshipTypeDescription: string, relationshipType: RelationshipType) => {
				const currentOptionEl = relationshipTypeSelectorEl.createEl("option", {
					text: relationshipTypeDescription,
					value: relationshipTypeDescription,
				});

				if (isFirst) {
					currentOptionEl.selected = true;
					isFirst = false;
				} else if (relationship !== undefined && relationship.type === relationshipType) currentOptionEl.selected = true;

				if (relationship !== undefined && relationship.type === RelationshipType.Parent) {
					relationshipTypeSelectorEl.createEl("option", {
						text: 'parent',
						value: 'parent',
					}).selected = true;
				}
			});
		}

		if(relationship !== undefined && relationship.type === RelationshipType.Parent) relationshipTypeSelectorEl.disabled = true;

		relationshipTypeSelectorEl.addEventListener('change', () => {
			if (checkboxEl.checked === false) checkboxEl.checked = true;
			this._addOrRemoveElementRelationship(
				checkboxEl,
				relationshipTypeSelectorEl,
				component,
				relationship,
			);
		});

		return relationshipTypeSelectorEl;
	}

	private _addOrRemoveElementRelationship(
		checkboxEl: HTMLInputElement,
		relationshipTypeSelectorEl: HTMLSelectElement,
		relatedComponent: ComponentInterface,
		existingRelationship: RelationshipInterface|undefined,
	): void {
		if (checkboxEl.checked) {
			const relationshipType = (relationshipTypeSelectorEl.value === '')
				? RelationshipType.Bidirectional
				: this.factories.relationshipType.createRelationshipType(relationshipTypeSelectorEl.value);

			const newRelationship = this.factories.relationship.create(
				relationshipType,
				relatedComponent.file.path,
				existingRelationship?.description,
				relatedComponent,
				false,
				this.currentComponent.getRelationships(),
			)

			this.manipulators.codeblock.addOrUpdateRelationship(newRelationship);
		} else {
			this.manipulators.codeblock.removeRelationship(relatedComponent.file.path);
		}
	}

	onClose() {
		super.onClose();
	}
}
