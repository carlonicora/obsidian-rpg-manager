import {Component, fuzzySearch, MarkdownRenderer, prepareQuery, SearchResult} from "obsidian";
import {ComponentType} from "../../../core/enums/ComponentType";
import {SorterComparisonElement} from "../../sorterService/SorterComparisonElement";
import {SorterType} from "../../../database/enums/SorterType";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {RelationshipType} from "../enums/RelationshipType";
import {IdInterface} from "../../idService/interfaces/IdInterface";
import {AbstractModal} from "../../../managers/modalsManager/abstracts/AbstractModal";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {RelationshipService} from "../RelationshipService";
import {CodeblockService} from "../../codeblockService/CodeblockService";
import {SorterService} from "../../sorterService/SorterService";

export class RelationshipsSelectionModal extends AbstractModal {
	private _relationshipsEl: HTMLDivElement;
	private _relationshipTypeSelectorEl: HTMLSelectElement;

	private _availableRelationships: Map<ComponentType, ComponentType[]> = new Map<ComponentType, ComponentType[]>([
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

	private _relationshipTypeAllowedChildren: Map<ComponentType, boolean> = new Map<ComponentType, boolean>([
		[ComponentType.Clue,true],
		[ComponentType.Event,true],
		[ComponentType.Faction,true],
		[ComponentType.Location,true],
		[ComponentType.Music,true],
	]);

	constructor(
		api: RpgManagerApiInterface,
		private _currentComponent: ModelInterface,
	) {
		super(api);
	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();
		this.modalEl.style.width = 'var(--modal-max-width)';

		const relationshipsModalEl = contentEl.createDiv({cls: 'rpgm-modal-relationshipsService'});

		relationshipsModalEl.createEl('h2', {text: 'Relationship Selector'});

		const relationshipShortlistenersContainerEl: HTMLDivElement = relationshipsModalEl.createDiv({cls: 'clearfix'});

		this._requiredRelationshipType(relationshipShortlistenersContainerEl);
		this._componentSearcher(relationshipShortlistenersContainerEl);

		this._relationshipsEl = relationshipsModalEl.createDiv({cls:'relationships', text: ''});
		this._addElementsToList();
	}

	private _requiredRelationshipType(
		contentEl: HTMLElement,
	): void {
		const relationshipSelectorEl: HTMLDivElement = contentEl.createDiv({cls: 'relationship-select'});


		relationshipSelectorEl.createDiv().createEl('label', {text: 'Select the type of component'});
		this._relationshipTypeSelectorEl = relationshipSelectorEl.createEl('select');
		this._relationshipTypeSelectorEl.createEl("option", {
			text: 'Existing Relationships',
			value: '',
		});
		const availableRelationships = this._availableRelationships.get(this._currentComponent.id.type);
		if (availableRelationships !== undefined && availableRelationships.length > 0) {
			availableRelationships.forEach((type: ComponentType) => {
				this._relationshipTypeSelectorEl.createEl("option", {
					text: ComponentType[type] + 's',
					value: type.toString(),
				});
			});
			this._relationshipTypeSelectorEl.addEventListener('change', () => {
				this._relationshipsEl.empty();
				let value: ComponentType|undefined = undefined;

				if (this._relationshipTypeSelectorEl.value !== '') value = (+this._relationshipTypeSelectorEl.value);
				this._addElementsToList(value);
			});
		}
	}

	private _componentSearcher(
		contentEl: HTMLElement,
	): void {
		const componentSearchContainerEl: HTMLDivElement = contentEl.createDiv({cls: 'relationship-select'});

		const searchTitle = this._relationshipTypeSelectorEl.value === '' ? 'Search a specific Component' : 'Search a specific ' + ComponentType[this._relationshipTypeSelectorEl.value as keyof typeof ComponentType] ;
		componentSearchContainerEl.createDiv().createEl('label', {text: searchTitle});

		const searchTermEl: HTMLInputElement = componentSearchContainerEl.createEl('input', {type: 'text'});
		searchTermEl.addEventListener('keyup', () => {
			this._relationshipsEl.empty();
			let value: ComponentType|undefined = undefined;

			if (this._relationshipTypeSelectorEl.value !== '') value = (+this._relationshipTypeSelectorEl.value);
			this._addElementsToList(value, searchTermEl.value);
		});
	}

	private _addElementsToList(
		type?: ComponentType,
		searchTerm?: string,
	): void {
		const relationshipsTableEl: HTMLTableSectionElement = this._relationshipsEl.createEl('table').createTBody();

		const components: Array<ModelInterface> = this.search(type, searchTerm);

		components.forEach((component: ModelInterface) => {
			if (component.id !== this._currentComponent.id) {
				const relationships: RelationshipInterface[] = this._currentComponent.getRelationships()
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
				const imageCellEl: HTMLTableCellElement = rowEl.insertCell();

				if (component.images.length > 0) {
					const img = new Image(40, 40);

					img.onload = (evt: Event) => {
						img.style.objectFit = 'cover';
						imageCellEl.append(img as Node);
					};

					img.src = component.images[0].src;
				}

				/** TYPE SELECTOR */
				const relationshipTypeSelectorEl = this._addRelationshipTypeSelector(
					component,
					relationship,
					rowEl.insertCell(),
					checkboxEl,
				);

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
				synopsisEl.addClass('description');
				MarkdownRenderer.renderMarkdown(
					(relationship !== undefined && relationship.description != undefined && relationship.description !== '')
						? relationship.description
						: (component.synopsis ?? ''),
					synopsisEl,
					'',
					null as unknown as Component,
				);

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
		component: ModelInterface,
		relationship: RelationshipInterface|undefined,
		containerEl: HTMLTableCellElement,
		checkboxEl: HTMLInputElement,
	): HTMLSelectElement {
		containerEl.addClass('selector');
		const availableRelationshipsType: Map<RelationshipType, string> = new Map<RelationshipType, string>();

		if (this._currentComponent.id.type !== component.id.type)
			availableRelationshipsType.set(RelationshipType.Bidirectional, this.api.service(RelationshipService).getReadableRelationshipType(RelationshipType.Bidirectional));

		availableRelationshipsType.set(RelationshipType.Unidirectional,
			this.api.service(RelationshipService).getReadableRelationshipType(RelationshipType.Unidirectional));

		if (this._currentComponent.id.type === component.id.type && this._relationshipTypeAllowedChildren.has(component.id.type))
			availableRelationshipsType.set(RelationshipType.Child, this.api.service(RelationshipService).getReadableRelationshipType(RelationshipType.Child));

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
		relatedComponent: ModelInterface,
		existingRelationship: RelationshipInterface|undefined,
	): void {
		if (checkboxEl.checked) {
			const relationshipType = (relationshipTypeSelectorEl.value === '')
				? RelationshipType.Bidirectional
				: this.api.service(RelationshipService).getTypeFromString(relationshipTypeSelectorEl.value);

			const newRelationship = this.api.service(RelationshipService).createRelationship(
				relationshipType,
				relatedComponent.file.path,
				existingRelationship?.description,
				relatedComponent,
				false,
				this._currentComponent.getRelationships(),
			);

			this.api.service(CodeblockService).addOrUpdateRelationship(newRelationship);
		} else {
			this.api.service(CodeblockService).removeRelationship(relatedComponent.file.path);
		}
	}

	onClose() {
		super.onClose();
	}

	public search(
		type?: ComponentType,
		term?: string,
	):  Array<ModelInterface> {

		let components: ModelInterface[] = [];
		if (type !== undefined) {
			components = this.api.database.readList<ModelInterface>(type, this._currentComponent.id)
				.sort(
					this.api.service(SorterService).create<ModelInterface>([
						new SorterComparisonElement((component: ModelInterface) => this._currentComponent.getRelationships().existsAlready(component), SorterType.Descending),
						new SorterComparisonElement((component: ModelInterface) => component.file.stat.mtime, SorterType.Descending),
					])
				);
		} else {
			components = this.api.database.recordset
				.filter((component: ModelInterface) => this._currentComponent.getRelationships().existsAlready(component))
				.sort(
					this.api.service(SorterService).create<ModelInterface>([
						new SorterComparisonElement((component: ModelInterface) => component.file.stat.mtime, SorterType.Descending),
					])
				);
		}

		if (term === undefined)
			return components;


		const matches: Map<IdInterface, {component: ModelInterface, result?: SearchResult}> = new Map<IdInterface, {component: ModelInterface; result?: SearchResult}>();

		const query = prepareQuery(term);
		components.forEach((component: ModelInterface) => {
			component.alias.forEach((alias: string) => {
				if (alias.toLowerCase().startsWith(term.toLowerCase()))
					matches.set(component.id, {component: component});
			});

			if (!matches.has(component.id)) {

				const fuzzySearchResult = fuzzySearch(query, component.file.basename + ' ' + component.synopsis);
				if (fuzzySearchResult != null && fuzzySearchResult.matches !== null)
					matches.set(component.id, {component: component, result: fuzzySearchResult});
			}
		});

		if (matches.size === 0)
			return [];

		const resultArray: Array<{component: ModelInterface, result?: SearchResult}> = [];
		matches.forEach((value: {component: ModelInterface, result?: SearchResult}) => {
			resultArray.push(value);
		});

		resultArray.sort((a: {component: ModelInterface, result?: SearchResult}, b: {component: ModelInterface, result?: SearchResult}) => {
			if (a.result === undefined && b.result !== undefined) return -1;
			if (a.result !== undefined && b.result === undefined) return 1;
			if (a.result === undefined && b.result === undefined) return 0;
			if (a.result !== undefined && b.result !== undefined) {
				if (a.result?.score !== undefined && b.result?.score === undefined) return -1;
				if (a.result?.score === undefined && b.result?.score !== undefined) return +1;
				return b.result.score - a.result.score;
			}
			return 0;
		});

		const response: Array<ModelInterface> = [];
		resultArray.forEach((value: {component: ModelInterface, result?: SearchResult}) => {
			response.push(value.component);
		});

		return  response;
	}
}
