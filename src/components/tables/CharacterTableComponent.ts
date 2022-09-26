import {ContentType} from "../../enums/ContentType";
import {CharacterInterface} from "../../interfaces/data/CharacterInterface";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {AbstractTableComponent} from "../../abstracts/AbstractTableComponent";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../settings/RpgManagerSettingsInterface";

export class CharacterTableComponent extends AbstractTableComponent {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.CharacterList;

	protected generateHeaderElement(
		fieldName: string,
	): ContentInterface|undefined {
		switch (fieldName.toLowerCase()) {
			case 'age':
				return this.factories.contents.create('Age', ContentType.String);
				break;
		}

		return super.generateHeaderElement(fieldName);
	}

	protected generateContentElement<T extends RecordInterface>(
		index: number,
		fieldName: string,
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const character: CharacterInterface = <unknown>record as CharacterInterface;
		switch (fieldName.toLowerCase()) {
			case 'name':
				return this.factories.contents.create(record.link + (character.isDead ? '\n_(Deceased)_' : ''), ContentType.Link, true);
				break;
			case 'synopsis':
				return this.factories.contents.create(relationship.description !== '' ? relationship.description : record.synopsis, ContentType.Markdown);
				break;
		}

		return super.generateContentElement(index, fieldName, record, relationship);
	}
}
