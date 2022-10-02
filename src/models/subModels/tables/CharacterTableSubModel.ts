import {ContentType} from "../../../enums/ContentType";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../enums/TableField";
import {ComponentV2Interface} from "../../../_dbV2/interfaces/ComponentV2Interface";
import {CharacterV2Interface} from "../../../_dbV2/components/interfaces/CharacterV2Interface";
import {RelationshipV2Interface} from "../../../_dbV2/relationships/interfaces/RelationshipV2Interface";

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
		component: T,
		relationship: RelationshipV2Interface,
	): ContentInterface|undefined {
		const character: CharacterV2Interface = <unknown>component as CharacterV2Interface;
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
