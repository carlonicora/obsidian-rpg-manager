import {ContentType} from "../../enums/ContentType";
import {EventInterface} from "../../interfaces/data/EventInterface";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {AbstractTableComponent} from "../../abstracts/AbstractTableComponent";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../enums/TableField";

export class EventTableComponent extends AbstractTableComponent {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.EventList;

	protected generateContentElement<T extends RecordInterface>(
		index: number,
		fieldType: TableField,
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const event: EventInterface = <unknown>record as EventInterface;
		switch (fieldType) {
			case TableField.Date:
				return this.factories.contents.create(event.date?.toDateString(), ContentType.Date, true);
				break;
		}

		return super.generateContentElement(index, fieldType, record, relationship);
	}
}
