import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {RelationshipType} from "../../../services/relationshipsService/enums/RelationshipType";
import {RelationshipsViewInterface} from "../interfaces/RelationshipsViewInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {TableField, tableFieldName} from "../../../services/relationshipsService/enums/TableField";
import {RelationshipService} from "../../../services/relationshipsService/RelationshipService";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";
import {Component, MarkdownRenderer, setIcon} from "obsidian";
import {
	SorterComparisonElementInterface
} from "../../../services/sorterService/interfaces/SorterComparisonElementInterface";
import {sceneTypeDescription} from "../../../services/analyserService/enums/SceneType";
import {EventInterface} from "../../../components/event/interfaces/EventInterface";
import {SessionInterface} from "../../../components/session/interfaces/SessionInterface";
import {AdventureInterface} from "../../../components/adventure/interfaces/AdventureInterface";
import {ActInterface} from "../../../components/act/interfaces/ActInterface";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import {SorterComparisonElement} from "../../../services/sorterService/SorterComparisonElement";
import {SorterService} from "../../../services/sorterService/SorterService";
import {ContentEditorService} from "../../../services/contentEditorService/ContentEditorService";
import {SessionModel} from "../../../components/session/models/SessionModel";
import {CalendarType} from "../../../services/dateService/enums/CalendarType";
import {
	FantasyCalendarSorterComparisonElement
} from "../../../services/fantasyCalendarService/sorters/FantasyCalendarSorterComparisonElement";
import {CodeblockService} from "../../../services/codeblockService/CodeblockService";
import {CampaignModel} from "../../../components/campaign/models/CampaignModel";
import {SceneModel} from "../../../components/scene/models/SceneModel";

export abstract class AbstractRelationshipView implements RelationshipsViewInterface {
	public relatedComponentType: ComponentType;
	public relationshipType: RelationshipType|undefined;
	public relationshipTitle: string|undefined;

	protected _relationshipSortingMap: Map<ComponentType, SorterComparisonElementInterface[]> = new Map<ComponentType, SorterComparisonElementInterface[]>();
	protected canBeOrdered = false;

	private _tableEl: HTMLTableElement;

	private _draggedRow: Element|null|undefined = undefined;
	private _initialPosition: number|undefined = undefined;
	private _initialId: string|undefined = undefined;
	private _newPosition: number|undefined = undefined;

	private _componentSortingMap: Map<ComponentType, SorterComparisonElementInterface[]> = new Map<ComponentType, SorterComparisonElementInterface[]>();
	private _cellClass: Map<TableField, string[]> = new Map<TableField, string[]>();

	private _fields: TableField[];
	private _relationships: RelationshipInterface[];

	constructor(
		protected api: RpgManagerApiInterface,
		public model: ModelInterface,
		public containerEl: HTMLDivElement,
		public sourcePath: string,
	) {
		this._relationshipSortingMap = new Map();
		if (this.model.campaign.calendar === CalendarType.Gregorian){
			this._relationshipSortingMap.set(ComponentType.Event, [
				new SorterComparisonElement((component: RelationshipInterface) => (<EventInterface>component.component).date?.date)
			]);
		} else {
			this._relationshipSortingMap.set(ComponentType.Event, [
				new FantasyCalendarSorterComparisonElement((component: RelationshipInterface) => (<EventInterface>component.component).date?.date)
			]);
		}
		this._relationshipSortingMap.set(ComponentType.Session, [
			new SorterComparisonElement((component: RelationshipInterface) => (<SessionInterface>component.component).index.positionInParent),
		]);
		this._relationshipSortingMap.set(ComponentType.Adventure, [
			new SorterComparisonElement((component: RelationshipInterface) => (<AdventureInterface>component.component).index.positionInParent),
		]);
		this._relationshipSortingMap.set(ComponentType.Act, [
			new SorterComparisonElement((component: RelationshipInterface) => (<ActInterface>component.component).index.parentPosition),
			new SorterComparisonElement((component: RelationshipInterface) => (<ActInterface>component.component).index.positionInParent),
		]);
		this._relationshipSortingMap.set(ComponentType.Scene, [
			new SorterComparisonElement((component: RelationshipInterface) => (<SceneInterface>component.component).index.parentPosition),
			new SorterComparisonElement((component: RelationshipInterface) => (<SceneInterface>component.component).index.positionInParent),
		]);

		this._cellClass.set(TableField.Date, ['smaller', 'inline']);
		this._cellClass.set(TableField.Duration, ['smaller']);
		this._cellClass.set(TableField.Index, ['smaller']);
		this._cellClass.set(TableField.Age, ['smaller']);
		this._cellClass.set(TableField.Url, ['smaller', 'inline']);
		this._cellClass.set(TableField.SceneExciting, ['smaller']);
		this._cellClass.set(TableField.SceneType, ['smaller']);
		this._cellClass.set(TableField.Found, ['smaller']);
		this._cellClass.set(TableField.Name, ['inline']);
		this._cellClass.set(TableField.Image, ['image']);
	}

	public render(
	): void {
		if (this.model instanceof CampaignModel && this.relatedComponentType !== ComponentType.Adventure)
			this.canBeOrdered = false;

		if (this.relationshipType === undefined)
			this.relationshipType = RelationshipType.Reversed | RelationshipType.Bidirectional | RelationshipType.Unidirectional;

		if (this.relationshipType === RelationshipType.Unidirectional)
			this.relationshipType = RelationshipType.Unidirectional | RelationshipType.Bidirectional;

		this._fields = this.api.service(RelationshipService).getTableFields(this.relatedComponentType);
		this._relationships = this.model.getRelationships().filter((relationship: RelationshipInterface) =>
			relationship.component !== undefined &&
			relationship.component.index.type === this.relatedComponentType &&
			(this.relationshipType === undefined || (this.relationshipType & relationship.type) === relationship.type)
		);

		if (this._relationships.length > 0) {
			let sorter: SorterComparisonElementInterface[]|undefined = undefined;

			if (this.relatedComponentType === ComponentType.Scene && this.model instanceof SessionModel)
				sorter = [new SorterComparisonElement((component: RelationshipInterface) => (<SceneInterface>component.component).positionInSession)];
			else
				sorter = this._relationshipSortingMap.get(this.relatedComponentType);

			if (sorter === undefined)
				sorter = [new SorterComparisonElement((relationship: RelationshipInterface) => (<ModelInterface>relationship.component).file.basename)];

			this._relationships.sort(this.api.service(SorterService).create(sorter));

			this._addTitle();
			this._tableEl = this.containerEl.createEl('table', {cls: 'rpg-manager-table'});
			this._addHeaders();
			this._addRelationships();
		}
	}

	private _addTitle(
	): void {
		const headerEl = this.containerEl.createEl('h3', {cls: 'rpg-manager-table-header'});
		const arrowEl: HTMLSpanElement = headerEl.createSpan();
		arrowEl.style.marginRight = '10px';
		setIcon(arrowEl, 'openClose');

		const arrowIconEl: HTMLElement = arrowEl.children[0] as HTMLElement;

		arrowIconEl.style.transform = 'rotate(90deg)';

		headerEl.createSpan({text: this.relationshipTitle ?? ComponentType[this.relatedComponentType] + 's'});

		headerEl.addEventListener('click', () => {
			if (this._tableEl.style.display === 'none'){
				this._tableEl.style.display = '';
				arrowIconEl.style.transform = 'rotate(90deg)';
			} else {
				this._tableEl.style.display = 'none';
				arrowIconEl.style.transform = 'rotate(0deg)';
			}
		});
	}

	private _addHeaders(
	): void {
		const tableHeader = this._tableEl.createTHead();
		const headerRow: HTMLTableRowElement = tableHeader.insertRow();

		if (this.canBeOrdered){
			const cell = headerRow.createEl('th');
			cell.addClass('rpg-manager-table-draggable-title');
			const iconEl = cell.createSpan();
			setIcon(iconEl, 'grip-horizontal');
		}

		this._fields.forEach((field: TableField) => {
			const cell = headerRow.createEl('th');

			if (field === TableField.StoryCircleIndicator)
				cell.textContent = '';
			else if (field === TableField.Index)
				cell.textContent = '#';
			else
				cell.textContent = tableFieldName.get(field) ?? '';

			if (this.api.service(RelationshipService).getTableFieldInline(this.relatedComponentType, field))
				cell.addClass('inline');
		});

		headerRow.insertCell();
	}

	private _dragStart(evt: DragEvent) {
		const target = evt.target as Element;

		if (target != undefined) {
			const initialValidPosition: string|undefined = (<HTMLElement>target).dataset.position;
			const initialValidId: string|undefined = (<HTMLElement>target).dataset.id;

			if (initialValidPosition !== undefined && initialValidId !== undefined) {
				this._initialPosition = +initialValidPosition;
				this._initialId = initialValidId;
			}

			this._draggedRow = target;
		}
	}

	private _dragEnd() {
		if (this._initialPosition === undefined || this._newPosition === undefined || this._initialId === undefined)
			return;

		for (let index=1; index<this._tableEl.rows.length; index++){
			const originalValidPosition: string|undefined = this._tableEl.rows[index].dataset.position;
			const originalValidId: string|undefined = this._tableEl.rows[index].dataset.id;
			if (originalValidPosition !== undefined && originalValidId !== undefined && index !== +originalValidPosition){
				try {
					const element = this.api.database.readById(originalValidId);

					if (element !== undefined) {
						if (this.model instanceof SessionModel && element instanceof SceneModel)
							this.api.service(CodeblockService).addOrUpdate('data.positionInSession', index, element.file);
						else
							this.api.service(CodeblockService).addOrUpdateInIndex('positionInParent', index, element.file);

					}
				} catch (e) {
					// No need to trap
				}
			}

			this._tableEl.rows[index].children[1].textContent = index.toString();
		}
	}

	private _dragOver(evt: DragEvent) {
		if (evt != undefined && this._draggedRow != undefined) {
			evt.preventDefault();

			if (evt.target != undefined) {
				const target = evt.target as Element;

				if (target.parentNode != undefined && target.parentNode.parentNode != undefined) {
					const children = Array.from(target.parentNode.parentNode.children);
					const parentNode: Element = target.parentNode as Element;

					const newValidPosition: string|undefined = (<HTMLElement>parentNode).dataset.position;

					if (newValidPosition !== undefined && +newValidPosition !== this._initialPosition)
						this._newPosition = +newValidPosition;

					if (children.indexOf(parentNode) > children.indexOf(this._draggedRow))
						try {
							parentNode.after(this._draggedRow);
						} catch (e) {
							//no need
						}
					else
						try {
							parentNode.before(this._draggedRow);
						} catch (e) {
							//no need
						}

				}
			}
		}
	}

	private _addRelationships(
	): void {
		const tableBody = this._tableEl.createTBody();

		let index=0;
		this._relationships.forEach((relationship: RelationshipInterface) => {
			index++;
			const relationshipRow: HTMLTableRowElement = tableBody.insertRow();
			relationshipRow.dataset.id = relationship.component?.index.id;

			if (this.model instanceof SessionModel && relationship.component instanceof SceneModel)
				relationshipRow.dataset.position = (<SceneInterface>relationship.component).positionInSession?.toString();
			else
				relationshipRow.dataset.position = relationship.component?.index.positionInParent.toString();

			if (this.canBeOrdered){
				relationshipRow.draggable = true;
				relationshipRow.ondragstart = this._dragStart.bind(this);
				relationshipRow.ondragover = this._dragOver.bind(this);
				relationshipRow.ondragend = this._dragEnd.bind(this);

				const cell = relationshipRow.insertCell();
				cell.addClass('rpg-manager-table-draggable');

				const iconEl = cell.createSpan();
				setIcon(iconEl, 'grip-horizontal');
			}

			this._fields.forEach((field: TableField) => {
				const cell = relationshipRow.insertCell();

				const classes = this._cellClass.get(field);

				if (classes !== undefined)
					cell.addClasses(classes);

				if (relationship.component !== undefined) {
					const value = this.getDefaultFieldValue(index, field, relationship.component, relationship.description);

					if (value === '') {
						cell.textContent = '';
					} else {
						let image: any|undefined = undefined;
						let svgContainer: HTMLDivElement|undefined = undefined;
						let editedValue = '';
						switch(field){
							case TableField.Image:
								image = new Image(50, 50);

								image.onerror = (evt: Event | string) => {
									cell.textContent = '';
									return;
								};

								image.onload = (evt: Event) => {
									image.style.objectFit = 'cover';

									cell.append(image);
									cell.style.width = image.style.width;
								};

								image.src = value;
								break;
							case TableField.SceneType:
								editedValue = sceneTypeDescription.get(+value) ?? '';
								editedValue = editedValue.substring(0, editedValue.indexOf(':'));
								cell.textContent = editedValue;
								break;
							case TableField.SceneExciting:
								cell.textContent = value === String(true) ? 'Yes' : '';
								break;
							case TableField.Duration:
								if (value !== '00:00')
									cell.textContent = value;
								break;
							case TableField.StoryCircleIndicator:
								svgContainer = cell.createDiv();
								setIcon(svgContainer, 'pieEighth');
								svgContainer.style.transform = 'rotate(' + (+value * 45).toString() + 'deg)';
								break;
							default:
								MarkdownRenderer.renderMarkdown(
									this.getDefaultFieldValue(index, field, relationship.component, relationship.description),
									cell,
									this.sourcePath,
									null as unknown as Component,
								);
								break;
						}
					}
				}
			});

			const editCell = relationshipRow.insertCell();

			const isRowEditable = (
				this.relationshipType !== undefined &&
				(
					relationship.type !== RelationshipType.Parent &&
					relationship.type !== RelationshipType.Hierarchy
				)
			);

			if (isRowEditable){
				editCell.addClass('rpg-manager-table-editor-container');

				const editorEl = editCell.createDiv({cls: 'rpg-manager-table-editor'});
				setIcon(editorEl, 'edit');

				editorEl.addEventListener('click', () => {
					this.api.service(ContentEditorService).open(this.model, relationship.path);
				});
			}

		});
	}

	protected getDefaultFieldValue(
		index: number,
		field: TableField,
		model: ModelInterface,
		description?: string,
	): string {
		switch (field) {
			case TableField.Index:
				return index.toString();
			case TableField.Synopsis:
				return (description != undefined && description !== '')
					? description
					: model.synopsis ?? '';
			case TableField.Image:
				return (model.images.length > 0)
					? model.images[0].src
					: '';
			case TableField.Name:
				return model.link;
		}

		return this.getFieldValue(field, model);
	}

	protected abstract getFieldValue(field: TableField, model: ModelInterface,): string;
}
