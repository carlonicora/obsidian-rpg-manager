import {ContentType} from "../../../enums/ContentType";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../enums/TableField";
import {ComponentInterface} from "../../../database/interfaces/ComponentInterface";
import {EventInterface} from "../../../database/components/interfaces/EventInterface";
import {RelationshipInterface} from "../../../database/relationships/interfaces/RelationshipInterface";

export class EventTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.EventList;

	protected generateContentElement<T extends ComponentInterface>(
		index: number,
		fieldType: TableField,
		component: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const event: EventInterface = <unknown>component as EventInterface;
		switch (fieldType) {
			case TableField.Date:
				return this.factories.contents.create(event.date?.toDateString(), ContentType.Date, true);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
