import {Component, fuzzySearch, MarkdownRenderer, prepareQuery, SearchResult} from "obsidian";
import {ComponentType} from "../../../core/enums/ComponentType";
import {SorterComparisonElement} from "../../sorterService/SorterComparisonElement";
import {SorterType} from "../../searchService/enums/SorterType";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {RelationshipType} from "../enums/RelationshipType";
import {IndexInterface} from "../../indexService/interfaces/IndexInterface";
import {AbstractModal} from "../../../managers/modalsManager/abstracts/AbstractModal";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {RelationshipService} from "../RelationshipService";
import {CodeblockService} from "../../codeblockService/CodeblockService";
import {SorterService} from "../../sorterService/SorterService";

export class RelationshipsSelectionModal extends AbstractModal {
	private _relationshipsEl: HTMLDivElement;
	private _relationshipTypeSelectorEl: HTMLSelectElement;
	private _navigationEl: HTMLDivElement;
	private _selectedType: ComponentType|undefined = undefined;

	protected maxWidth = true;
	protected title = 'Relationship Selector';

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

		this.rpgmContainerEl.addClass('rpg-manager-modal-relationships');

		this._navigationEl = this.rpgmContainerEl.createDiv({cls: 'rpg-manager-modal-relationships-navigation'});
		this._addNavigation();

		const searchEl: HTMLDivElement = this.rpgmContainerEl.createDiv({cls: 'rpg-manager-modal-relationships-navigation'});
		this._componentSearcher(searchEl);

		const relationshipsModalEl = this.rpgmContainerEl.createDiv({cls: 'rpg-manager-modal-relationships-container clearfix'});

		this._relationshipsEl = relationshipsModalEl.createDiv({cls:'relationships', text: ''});
		this._addElementsToList();
	}

	private _addNavigation(
	): void {
		const availableRelationships = this._availableRelationships.get(this._currentComponent.index.type);

		this._addLinkWithFunction(
			this._navigationEl,
			'Existing',
			() => {
				this._relationshipsEl.empty();
				this._selectedType = undefined;
				this._addElementsToList();
			}
		);

		if (availableRelationships !== undefined && availableRelationships.length > 0) {
			availableRelationships.forEach((type: ComponentType) => {
				this._addSeparator(this._navigationEl);

				this._addLinkWithFunction(
					this._navigationEl,
					ComponentType[type] + 's',
					() => {
						this._relationshipsEl.empty();
						this._selectedType = type;
						this._addElementsToList(type);
					}
				);
			});
		}
	}

	private _componentSearcher(
		contentEl: HTMLElement,
	): void {
		const componentSearchContainerEl: HTMLDivElement = contentEl.createDiv({cls: 'relationship-select'});
		componentSearchContainerEl.createDiv().createEl('label', {text: 'Search'});

		const searchTermEl: HTMLInputElement = componentSearchContainerEl.createEl('input', {type: 'text'});
		searchTermEl.addEventListener('keyup', () => {
			this._relationshipsEl.empty();
			this._addElementsToList(this._selectedType, searchTermEl.value);
		});
	}

	private _addElementsToList(
		type?: ComponentType,
		searchTerm?: string,
	): void {
		const relationshipsTableEl: HTMLTableSectionElement = this._relationshipsEl.createEl('table').createTBody();

		const components: Array<ModelInterface> = this.search(type, searchTerm);

		components.forEach((component: ModelInterface) => {
			if (component.index !== this._currentComponent.index) {
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

					if (relationship.isInContent || relationship.type === RelationshipType.Parent || relationship.isAlsoInContent)
						checkboxEl.disabled = true;
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

		if (this._currentComponent.index.type !== component.index.type)
			availableRelationshipsType.set(RelationshipType.Bidirectional, this.api.service(RelationshipService).getReadableRelationshipType(RelationshipType.Bidirectional));

		availableRelationshipsType.set(RelationshipType.Unidirectional,
			this.api.service(RelationshipService).getReadableRelationshipType(RelationshipType.Unidirectional));

		if (this._currentComponent.index.type === component.index.type && this._relationshipTypeAllowedChildren.has(component.index.type))
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

			if (existingRelationship !== undefined)
				this._currentComponent.getRelationships().remove(existingRelationship);

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
			components = this.api.database.readChildren<ModelInterface>(type, this._currentComponent.index.campaignId)
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


		const matches: Map<IndexInterface, {component: ModelInterface, result?: SearchResult}> = new Map<IndexInterface, {component: ModelInterface; result?: SearchResult}>();

		const query = prepareQuery(term);
		components.forEach((component: ModelInterface) => {
			component.alias.forEach((alias: string) => {
				if (alias.toLowerCase().startsWith(term.toLowerCase()))
					matches.set(component.index, {component: component});
			});

			if (!matches.has(component.index)) {
				const fuzzySearchResult = fuzzySearch(query, component.file.basename + ' ' + component.synopsis);
				if (fuzzySearchResult != null && fuzzySearchResult.matches !== null)
					matches.set(component.index, {component: component, result: fuzzySearchResult});

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

	private _addSeparator(
		containerEl: HTMLDivElement|HTMLSpanElement,
	): void {
		containerEl.createSpan({cls: 'separator', text: ' | '});
	}

	private _addLinkWithFunction(
		containerEl: HTMLDivElement|HTMLSpanElement,
		text: string,
		fn: any,
		isLast = false,
	): void {
		const containerSpanEl: HTMLSpanElement = containerEl.createSpan({cls: 'link'});
		if (isLast) containerSpanEl.addClass('clearfix');

		const anchorEl: HTMLAnchorElement = containerSpanEl.createEl('a', {href: '#', text: text});
		anchorEl.addEventListener('click', fn.bind(this));
	}
}
