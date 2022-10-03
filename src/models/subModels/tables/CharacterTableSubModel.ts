import {ContentType} from "../../../enums/ContentType";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../enums/TableField";
import {ComponentInterface} from "../../../database/interfaces/ComponentInterface";
import {CharacterInterface} from "../../../database/components/interfaces/CharacterInterface";
import {RelationshipInterface} from "../../../database/relationships/interfaces/RelationshipInterface";

export class CharacterTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.CharacterList;

	protected generateHeaderElement(
		fieldType: TableField,
	): ContentInterface|undefined {
		switch (fieldType) {
			case TableField.Age:
				return this.factories.contents.create('Age', ContentType.String);
				break;
		}

		return super.generateHeaderElement(fieldType);
	}

	protected generateContentElement<T extends ComponentInterface>(
		index: number,
		fieldType: TableField,
		component: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const character: CharacterInterface = <unknown>component as CharacterInterface;
		switch (fieldType) {
			case TableField.Name:
				return this.factories.contents.create(component.link + (character.isDead ? '\n_(Deceased)_' : ''), ContentType.Link, true);
				break;
			case TableField.Synopsis:
				return this.factories.contents.create(relationship.description !== '' ? relationship.description : component.synopsis, ContentType.Markdown);
				break;
			case TableField.Age:
				return this.factories.contents.create(character.age?.toString(), ContentType.String, true);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
