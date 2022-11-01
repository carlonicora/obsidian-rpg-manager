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
import {CampaignInterface} from "../../../components/campaign/interfaces/CampaignInterface";
import {SessionInterface} from "../../../components/session/interfaces/SessionInterface";
import {AdventureInterface} from "../../../components/adventure/interfaces/AdventureInterface";
import {ActInterface} from "../../../components/act/interfaces/ActInterface";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import {SorterComparisonElement} from "../../../services/sorterService/SorterComparisonElement";

export abstract class AbstractRelationshipView implements RelationshipsViewInterface {
	public relatedComponentType: ComponentType;
	public relationshipType: RelationshipType|undefined;
	public relationshipTitle: string|undefined;

	private _componentSortingMap: Map<ComponentType, SorterComparisonElementInterface[]> = new Map<ComponentType, SorterComparisonElementInterface[]>();

	private _fields: TableField[];
	private _relationships: RelationshipInterface[];
	protected _relationshipSortingMap: Map<ComponentType, SorterComparisonElementInterface[]> = new Map<ComponentType, SorterComparisonElementInterface[]>();

	private _tableEl: HTMLTableElement;

	constructor(
		protected api: RpgManagerApiInterface,
		public model: ModelInterface,
		public containerEl: HTMLDivElement,
		public sourcePath: string,
	) {
		this._relationshipSortingMap = new Map();
		this._relationshipSortingMap.set(ComponentType.Event, [new SorterComparisonElement((component: RelationshipInterface) => (<EventInterface>component.component).date)]);
		this._relationshipSortingMap.set(ComponentType.Campaign, [new SorterComparisonElement((component: RelationshipInterface) => (<CampaignInterface>component.component).id.campaignId)]);
		this._relationshipSortingMap.set(ComponentType.Session, [
			new SorterComparisonElement((component: RelationshipInterface) => (<SessionInterface>component.component).id.campaignId),
			new SorterComparisonElement((component: RelationshipInterface) => (<SessionInterface>component.component).id.adventureId),
		]);
		this._relationshipSortingMap.set(ComponentType.Adventure, [
			new SorterComparisonElement((component: RelationshipInterface) => (<AdventureInterface>component.component).id.campaignId),
			new SorterComparisonElement((component: RelationshipInterface) => (<AdventureInterface>component.component).id.adventureId),
		]);
		this._relationshipSortingMap.set(ComponentType.Act, [
			new SorterComparisonElement((component: RelationshipInterface) => (<ActInterface>component.component).id.campaignId),
			new SorterComparisonElement((component: RelationshipInterface) => (<ActInterface>component.component).id.adventureId),
			new SorterComparisonElement((component: RelationshipInterface) => (<ActInterface>component.component).id.actId),
		]);
		this._relationshipSortingMap.set(ComponentType.Scene, [
			new SorterComparisonElement((component: RelationshipInterface) => (<SceneInterface>component.component).id.campaignId),
			new SorterComparisonElement((component: RelationshipInterface) => (<SceneInterface>component.component).id.adventureId),
			new SorterComparisonElement((component: RelationshipInterface) => (<SceneInterface>component.component).id.actId),
			new SorterComparisonElement((component: RelationshipInterface) => (<SceneInterface>component.component).id.sceneId),
		]);
	}

	public render(
	): void {
		//TODO sort relationships!

		if (this.relationshipType === undefined)
			this.relationshipType = RelationshipType.Reversed | RelationshipType.Bidirectional | RelationshipType.Unidirectional;

		if (this.relationshipType === RelationshipType.Unidirectional)
			this.relationshipType = RelationshipType.Unidirectional | RelationshipType.Bidirectional;

		this._fields = this.api.service(RelationshipService).getTableFields(this.relatedComponentType);
		this._relationships = this.model.getRelationships().filter((relationship: RelationshipInterface) =>
			relationship.component !== undefined &&
			relationship.component.id.type === this.relatedComponentType &&
			(this.relationshipType === undefined || (this.relationshipType & relationship.type) === relationship.type)
		);

		if (this._relationships.length > 0) {
			this._addTitle();
			this._tableEl = this.containerEl.createEl('table');
			this.addHeaders();
			this.addRelationships();
		}
	}

	private _addTitle(
	): void {
		const headerEl = this.containerEl.createEl('h3', {cls: 'rpgm-table-header'});
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

	protected addHeaders(
	): void {
		const tableHeader = this._tableEl.createTHead();
		const headerRow: HTMLTableRowElement = tableHeader.insertRow();

		this._fields.forEach((field: TableField) => {
			const cell = headerRow.insertCell();

			if (field === TableField.StoryCircleIndicator)
				cell.textContent = ''
			else
				cell.textContent = tableFieldName.get(field) ?? '';

			if (this.api.service(RelationshipService).getTableFieldInline(this.relatedComponentType, field))
				cell.addClass('inline');
		});
	}

	protected addRelationships(
	): void {
		const tableBody = this._tableEl.createTBody();

		let index=0;
		this._relationships.forEach((relationship: RelationshipInterface) => {
			index++;
			const relationshipRow: HTMLTableRowElement = tableBody.insertRow();

			this._fields.forEach((field: TableField) => {
				const cell = relationshipRow.insertCell();

				if (this.api.service(RelationshipService).getTableFieldInline(this.relatedComponentType, field))
					cell.addClass('inline');

				if (relationship.component !== undefined) {
					const value = this.getDefaultFieldValue(index, field, relationship.component, relationship.description);

					if (value === '') {
						cell.textContent = '';
					} else {
						let image: any|undefined = undefined;
						let svgContainer: HTMLDivElement|undefined = undefined;
						switch(field){
							case TableField.Image:
								image = new Image(75, 75);

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
								cell.textContent = sceneTypeDescription.get(+value) ?? ''
								break;
							case TableField.SceneExciting:
								cell.textContent = value === String(true) ? 'Yes' : '';
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
				return (description !== undefined && description !== '')
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
