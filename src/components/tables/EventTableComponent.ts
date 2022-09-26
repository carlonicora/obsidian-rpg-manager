import {ContentType} from "../../enums/ContentType";
import {EventInterface} from "../../interfaces/data/EventInterface";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {AbstractTableComponent} from "../../abstracts/AbstractTableComponent";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../settings/RpgManagerSettingsInterface";

export class EventTableComponent extends AbstractTableComponent {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.EventList;

	protected generateContentElement<T extends RecordInterface>(
		index: number,
		fieldName: string,
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const event: EventInterface = <unknown>record as EventInterface;
		switch (fieldName.toLowerCase()) {
			case 'date':
				return this.factories.contents.create(event.date?.toDateString(), ContentType.Date, true);
				break;
		}

		return super.generateContentElement(index, fieldName, record, relationship);
	}
}
