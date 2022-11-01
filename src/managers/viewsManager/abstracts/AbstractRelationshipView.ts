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
import {RelationshipListInterface} from "../../../services/relationshipsService/interfaces/RelationshipListInterface";

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
		alternativeRelationships?: RelationshipListInterface,
	): void {
		if (this.relationshipType === undefined)
			this.relationshipType = RelationshipType.Reversed | RelationshipType.Bidirectional | RelationshipType.Unidirectional;

		if (this.relationshipType === RelationshipType.Unidirectional)
			this.relationshipType = RelationshipType.Unidirectional | RelationshipType.Bidirectional;

		this._fields = this.api.service(RelationshipService).getTableFields(this.relatedComponentType);
		this._relationships = (alternativeRelationships ? alternativeRelationships : this.model.getRelationships()).filter((relationship: RelationshipInterface) =>
			relationship.component !== undefined &&
			relationship.component?.id.type === this.relatedComponentType &&
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

		this._relationships.forEach((relationship: RelationshipInterface) => {
			const relationshipRow: HTMLTableRowElement = tableBody.insertRow();

			this._fields.forEach((field: TableField) => {
				const cell = relationshipRow.insertCell();

				if (this.api.service(RelationshipService).getTableFieldInline(this.relatedComponentType, field))
					cell.addClass('inline');

				if (relationship.component !== undefined)
					MarkdownRenderer.renderMarkdown(
						this.getDefaultFieldValue(field, relationship.component, relationship.description),
						cell,
						this.sourcePath,
						null as unknown as Component,
					);

			});
		});
	}

	protected getDefaultFieldValue(
		field: TableField,
		relatedModel: ModelInterface,
		description?: string,
	): string {
		switch (field) {
			case TableField.Synopsis:
				return (description !== undefined && description !== '')
					? description
					: this.model.synopsis ?? '';
			case TableField.Image:
				return (relatedModel.images.length > 0)
					? relatedModel.images[0].src
					: '';
		}

		return this.getFieldValue(field, relatedModel);
	}

	protected abstract getFieldValue(field: TableField, relatedModel: ModelInterface,): string;
}
