import {ContentType} from "../../../responses/enums/ContentType";
import {AbstractTableSubModel} from "../../abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../responses/contents/interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../views/enums/TableField";
import {ComponentInterface} from "../../../databases/interfaces/ComponentInterface";
import {EventInterface} from "../../../databases/components/interfaces/EventInterface";
import {RelationshipInterface} from "../../../relationships/interfaces/RelationshipInterface";

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
