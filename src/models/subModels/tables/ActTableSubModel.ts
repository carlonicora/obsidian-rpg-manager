import {ContentType} from "../../../enums/ContentType";
import {RelationshipInterface} from "../../../interfaces/RelationshipInterface";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../enums/TableField";
import {ComponentV2Interface} from "../../../_dbV2/interfaces/ComponentV2Interface";
import {ActV2Interface} from "../../../_dbV2/components/interfaces/ActV2Interface";

export class ActTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.ActList;

	protected generateContentElement<T extends ComponentV2Interface>(
		index: number,
		fieldType:  TableField,
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const act: ActV2Interface = <unknown>record as ActV2Interface;
		switch (fieldType) {
			case  TableField.Index:
				return this.factories.contents.create(act.id.actId, ContentType.Number, true);
				break;
		}

		return super.generateContentElement(index, fieldType, record, relationship);
	}
}
