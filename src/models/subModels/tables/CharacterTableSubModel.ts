import {ContentType} from "../../../enums/ContentType";
import {CharacterInterface} from "../../../interfaces/components/CharacterInterface";
import {RelationshipInterface} from "../../../interfaces/RelationshipInterface";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {ComponentInterface} from "../../../interfaces/database/ComponentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../enums/TableField";

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
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const character: CharacterInterface = <unknown>record as CharacterInterface;
		switch (fieldType) {
			case TableField.Name:
				return this.factories.contents.create(record.link + (character.isDead ? '\n_(Deceased)_' : ''), ContentType.Link, true);
				break;
			case TableField.Synopsis:
				return this.factories.contents.create(relationship.description !== '' ? relationship.description : record.synopsis, ContentType.Markdown);
				break;
			case TableField.Age:
				return this.factories.contents.create(character.age?.toString(), ContentType.String, true);
				break;
		}

		return super.generateContentElement(index, fieldType, record, relationship);
	}
}
