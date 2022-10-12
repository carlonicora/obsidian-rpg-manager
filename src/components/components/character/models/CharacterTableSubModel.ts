import {ContentType} from "../../../../responses/enums/ContentType";
import {AbstractTableSubModel} from "../../../../models/abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../../responses/contents/interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../../views/enums/TableField";
import {ComponentInterface} from "../../../interfaces/ComponentInterface";
import {CharacterInterface} from "../interfaces/CharacterInterface";
import {RelationshipInterface} from "../../../../relationships/interfaces/RelationshipInterface";

export class CharacterTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.CharacterList;

	protected generateHeaderElement(
		fieldType: TableField,
	): ContentInterface|undefined {
		switch (fieldType) {
			case TableField.Age:
				return this.factories.contents.create('Age', ContentType.String);
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
			case TableField.Age:
				return this.factories.contents.create(character.age?.toString(), ContentType.String, true);
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
