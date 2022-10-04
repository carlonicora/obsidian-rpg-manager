import {ContentType} from "../../../enums/ContentType";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../enums/TableField";
import {ComponentInterface} from "../../../database/interfaces/ComponentInterface";
import {AdventureInterface} from "../../../database/components/interfaces/AdventureInterface";
import {RelationshipInterface} from "../../../database/relationships/interfaces/RelationshipInterface";

export class AdventureTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.AdventureList;

	protected generateContentElement<T extends ComponentInterface>(
		index: number,
		fieldType:  TableField,
		component: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const adventure: AdventureInterface = <unknown>component as AdventureInterface;
		switch (fieldType) {
			case  TableField.Index:
				return this.factories.contents.create(adventure.id.adventureId, ContentType.Number, true);
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
