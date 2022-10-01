import {ContentType} from "../../../enums/ContentType";
import {RelationshipInterface} from "../../../interfaces/RelationshipInterface";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../enums/TableField";
import {ComponentV2Interface} from "../../../_dbV2/interfaces/ComponentV2Interface";
import {CharacterV2Interface} from "../../../_dbV2/components/interfaces/CharacterV2Interface";

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

	protected generateContentElement<T extends ComponentV2Interface>(
		index: number,
		fieldType: TableField,
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const character: CharacterV2Interface = <unknown>record as CharacterV2Interface;
		switch (fieldType) {
			case TableField.Name:
				return this.factories.contents.create(record.file.path + (character.isDead ? '\n_(Deceased)_' : ''), ContentType.Link, true);
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
