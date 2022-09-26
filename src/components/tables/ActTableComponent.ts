import {ContentType} from "../../enums/ContentType";
import {ActInterface} from "../../interfaces/data/ActInterface";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {AbstractTableComponent} from "../../abstracts/AbstractTableComponent";
import {RpgManagerAdvancedSettingsListsInterface} from "../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../enums/TableField";

export class ActTableComponent extends AbstractTableComponent {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.ActList;

	protected generateContentElement<T extends RecordInterface>(
		index: number,
		fieldType:  TableField,
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const act: ActInterface = <unknown>record as ActInterface;
		switch (fieldType) {
			case  TableField.Index:
				return this.factories.contents.create(act.actId, ContentType.Number, true);
				break;
		}

		return super.generateContentElement(index, fieldType, record, relationship);
	}
}
