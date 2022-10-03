import {ContentType} from "../../../enums/ContentType";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../enums/TableField";
import {ComponentInterface} from "../../../database/interfaces/ComponentInterface";
import {ActInterface} from "../../../database/components/interfaces/ActInterface";
import {RelationshipInterface} from "../../../database/relationships/interfaces/RelationshipInterface";

export class ActTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.ActList;

	protected generateContentElement<T extends ComponentInterface>(
		index: number,
		fieldType:  TableField,
		component: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const act: ActInterface = <unknown>component as ActInterface;
		switch (fieldType) {
			case  TableField.Index:
				return this.factories.contents.create(act.id.actId, ContentType.Number, true);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
