import {ContentType} from "../../enums/ContentType";
import {ActInterface} from "../../interfaces/data/ActInterface";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {AbstractTableComponent} from "../../abstracts/AbstractTableComponent";
import {RpgManagerAdvancedSettingsListsInterface} from "../../settings/RpgManagerSettingsInterface";

export class ActTableComponent extends AbstractTableComponent {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.ActList;

	protected generateContentElement<T extends RecordInterface>(
		index: number,
		fieldName: string,
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const act: ActInterface = <unknown>record as ActInterface;
		switch (fieldName.toLowerCase()) {
			case 'index':
				return this.factories.contents.create(act.actId, ContentType.Number, true);
				break;
		}

		return super.generateContentElement(index, fieldName, record, relationship);
	}
}
