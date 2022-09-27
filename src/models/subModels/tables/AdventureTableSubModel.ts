import {ContentType} from "../../../enums/ContentType";
import {AdventureInterface} from "../../../interfaces/components/AdventureInterface";
import {RelationshipInterface} from "../../../interfaces/RelationshipInterface";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {ComponentInterface} from "../../../interfaces/database/ComponentInterface";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../enums/TableField";

export class AdventureTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.AdventureList;

	protected generateContentElement<T extends ComponentInterface>(
		index: number,
		fieldType:  TableField,
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const adventure: AdventureInterface = <unknown>record as AdventureInterface;
		switch (fieldType) {
			case  TableField.Index:
				return this.factories.contents.create(adventure.adventureId, ContentType.Number, true);
				break;
		}

		return super.generateContentElement(index, fieldType, record, relationship);
	}
}
