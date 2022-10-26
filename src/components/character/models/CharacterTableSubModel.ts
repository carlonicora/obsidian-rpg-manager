import {ContentType} from "../../../../REFACTOR/responses/enums/ContentType";
import {AbstractTableSubModel} from "../../../../REFACTOR/models/abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../../REFACTOR/responses/contents/interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../../REFACTOR/views/enums/TableField";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {CharacterInterface} from "../interfaces/CharacterInterface";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";

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

	protected generateContentElement<T extends ModelInterface>(
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
