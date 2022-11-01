import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {RelationshipType} from "../../../services/relationshipsService/enums/RelationshipType";
import {RelationshipsViewInterface} from "../interfaces/RelationshipsViewInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {TableField, tableFieldName} from "../../../services/relationshipsService/enums/TableField";
import {RelationshipService} from "../../../services/relationshipsService/RelationshipService";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";
import {Component, MarkdownRenderer} from "obsidian";
import {
	SorterComparisonElementInterface
} from "../../../services/sorterService/interfaces/SorterComparisonElementInterface";

export abstract class AbstractRelationshipView implements RelationshipsViewInterface {
	public relatedComponentType: ComponentType;
	public relationshipType: RelationshipType|undefined;

	private _componentSortingMap: Map<ComponentType, SorterComparisonElementInterface[]> = new Map<ComponentType, SorterComparisonElementInterface[]>();

	private _fields: TableField[];
	private _relationships: RelationshipInterface[];

	private _tableEl: HTMLTableElement;

	constructor(
		protected api: RpgManagerApiInterface,
		public model: ModelInterface,
		public containerEl: HTMLDivElement,
		public sourcePath: string,
	) {
	}

	public render(
	): void {
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
			this._tableEl = this.containerEl.createEl('table');

			this.addHeaders();
			this.addRelationships();
		}
	}

	protected addHeaders(
	): void {
		const tableHeader = this._tableEl.createTHead();
		const headerRow: HTMLTableRowElement = tableHeader.insertRow();

		this._fields.forEach((field: TableField) => {
			const cell = headerRow.insertCell();
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
								break;
							case TableField.SceneExciting:
								break;
							case TableField.StoryCircleIndicator:
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
