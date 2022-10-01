import {ContentType} from "../../../enums/ContentType";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../enums/TableField";
import {ComponentV2Interface} from "../../../_dbV2/interfaces/ComponentV2Interface";
import {ActV2Interface} from "../../../_dbV2/components/interfaces/ActV2Interface";
import {RelationshipV2Interface} from "../../../_dbV2/relationships/interfaces/RelationshipV2Interface";

export class ActTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.ActList;

	protected generateContentElement<T extends ComponentV2Interface>(
		index: number,
		fieldType:  TableField,
		component: T,
		relationship: RelationshipV2Interface,
	): ContentInterface|undefined {
		const act: ActV2Interface = <unknown>component as ActV2Interface;
		switch (fieldType) {
			case  TableField.Index:
				return this.factories.contents.create(act.id.actId, ContentType.Number, true);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
