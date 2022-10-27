import {ContentType} from "../responses/enums/ContentType";
import {ContentInterface} from "../responses/contents/interfaces/ContentInterface";
import {AbstractTableSubModel} from "../models/abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../src/settings/RpgManagerSettingsInterface";
import {TableField} from "../views/enums/TableField";
import {ModelInterface} from "../../src/api/modelsManager/interfaces/ModelInterface";
import {ActInterface} from "../../src/components/act/interfaces/ActInterface";
import {RelationshipInterface} from "../../src/services/relationshipsService/interfaces/RelationshipInterface";

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
