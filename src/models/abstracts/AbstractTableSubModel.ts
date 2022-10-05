import {AbstractSubModel} from "./AbstractSubModel";
import {
	RpgManagerAdvancedSettingsListElementInterface,
	RpgManagerAdvancedSettingsListsInterface
} from "../../settings/RpgManagerSettingsInterface";
import {ContentType} from "../../responses/enums/ContentType";
import {ContentInterface} from "../../responses/contents/interfaces/ContentInterface";
import {ResponseDataElementInterface} from "../../responses/interfaces/ResponseDataElementInterface";
import {ResponseTable} from "../../responses/ResponseTable";
import {TableField} from "../../views/enums/TableField";
import {ComponentInterface} from "../../databases/interfaces/ComponentInterface";
import {RelationshipInterface} from "../../relationships/interfaces/RelationshipInterface";

export abstract class AbstractTableSubModel extends AbstractSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface;

	public async generateData(
		relationships: RelationshipInterface[],
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (relationships.length === 0) return null;

		const response = new ResponseTable(this.app, this.currentElement);
		response.open = this.advancedSettings.defaultVisible;

		response.addTitle(title ? title : this.advancedSettings.title);

		response.addHeaders(
			this.generateHeader(this.advancedSettings.fields)
		);

		let index=0;
		relationships.forEach((relationship: RelationshipInterface) => {
			const component: ComponentInterface|undefined = relationship.component;
			if (component !== undefined) {
				index++;
				response.addContent(
					this.generateContent<ComponentInterface>(index, this.advancedSettings.fields, component, relationship),
				);
			}
		});

		return response;
	}

	protected generateHeader(
		fields: Array<RpgManagerAdvancedSettingsListElementInterface>,
	): Array<ContentInterface> {
		const response: Array<ContentInterface> = []

		fields.forEach((listElement: RpgManagerAdvancedSettingsListElementInterface) => {
			if (listElement.checked) {
				const content: ContentInterface | undefined = this.generateHeaderElement(listElement.field);
				if (content !== undefined) response.push(content);
			}
		});

		return response;
	}

	protected generateHeaderElement(
		fieldType: TableField,
	): ContentInterface|undefined {
		switch (fieldType) {
			case  TableField.Index:
				return this.factories.contents.create('#', ContentType.String, true);
			case  TableField.Date:
				return this.factories.contents.create('Date', ContentType.String, true);
			case  TableField.Image:
				return this.factories.contents.create('', ContentType.String, true);
			case  TableField.Name:
				return this.factories.contents.create('Name', ContentType.String);
			case  TableField.Synopsis:
				return this.factories.contents.create('Synopsis', ContentType.String);
			case  TableField.Url:
				return this.factories.contents.create('Url', ContentType.String);
		}

		return this.factories.contents.create('', ContentType.String);
	}

	protected generateContent<T extends ComponentInterface>(
		index: number,
		fields: Array<RpgManagerAdvancedSettingsListElementInterface>,
		component: T,
		relationship: RelationshipInterface,
	): Array<ContentInterface> {
		const response: Array<ContentInterface> = []

		fields.forEach((listElement: RpgManagerAdvancedSettingsListElementInterface) => {
			if (listElement.checked) {
				const content: ContentInterface | undefined = this.generateContentElement<T>(index, listElement.field, component, relationship);
				if (content !== undefined) response.push(content);
			}
		});

		return response;
	}

	protected generateContentElement<T extends ComponentInterface>(
		index: number,
		fieldType: TableField,
		component: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		switch (fieldType) {
			case  TableField.Name:
				return this.factories.contents.create(component.link, ContentType.Link);
			case  TableField.Image:
				return this.factories.contents.create(component.image, ContentType.Image, true);
			case  TableField.Synopsis:
				return this.factories.contents.create((relationship.description !== '' && relationship.description != undefined) ? relationship.description : component.synopsis, ContentType.Markdown);
		}

		return this.factories.contents.create('', ContentType.String);
	}
}
