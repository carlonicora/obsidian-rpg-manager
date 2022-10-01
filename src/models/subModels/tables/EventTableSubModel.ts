import {ContentType} from "../../../enums/ContentType";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../enums/TableField";
import {ComponentV2Interface} from "../../../_dbV2/interfaces/ComponentV2Interface";
import {EventV2Interface} from "../../../_dbV2/components/interfaces/EventV2Interface";
import {RelationshipV2Interface} from "../../../_dbV2/relationships/interfaces/RelationshipV2Interface";

export class EventTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.EventList;

	protected generateContentElement<T extends ComponentV2Interface>(
		index: number,
		fieldType: TableField,
		component: T,
		relationship: RelationshipV2Interface,
	): ContentInterface|undefined {
		const event: EventV2Interface = <unknown>component as EventV2Interface;
		switch (fieldType) {
			case TableField.Date:
				return this.factories.contents.create(event.date?.toDateString(), ContentType.Date, true);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
