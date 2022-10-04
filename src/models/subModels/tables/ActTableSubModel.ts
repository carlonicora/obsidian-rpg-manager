import {ContentType} from "../../../responses/enums/ContentType";
import {ContentInterface} from "../../../responses/contents/interfaces/ContentInterface";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../views/enums/TableField";
import {ComponentInterface} from "../../../databases/interfaces/ComponentInterface";
import {ActInterface} from "../../../databases/components/interfaces/ActInterface";
import {RelationshipInterface} from "../../../relationships/interfaces/RelationshipInterface";

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
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
