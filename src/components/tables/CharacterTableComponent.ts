import {ContentType} from "../../enums/ContentType";
import {CharacterInterface} from "../../interfaces/data/CharacterInterface";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {AbstractTableComponent} from "../../abstracts/AbstractTableComponent";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../enums/TableField";

export class CharacterTableComponent extends AbstractTableComponent {
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

	protected generateContentElement<T extends RecordInterface>(
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
		}

		return super.generateContentElement(index, fieldType, record, relationship);
	}
}
