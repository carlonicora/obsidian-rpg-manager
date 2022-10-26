import {ContentType} from "../../../../REFACTOR/responses/enums/ContentType";
import {ContentInterface} from "../../../../REFACTOR/responses/contents/interfaces/ContentInterface";
import {AbstractTableSubModel} from "../../../../REFACTOR/models/abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../../REFACTOR/views/enums/TableField";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {ActInterface} from "../interfaces/ActInterface";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";

export class ActTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.ActList;

	protected generateContentElement<T extends ModelInterface>(
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
