import {ContentType} from "../../../responses/enums/ContentType";
import {AbstractTableSubModel} from "../../../REFACTOR/models/abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../responses/contents/interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../REFACTOR/views/enums/TableField";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {EventInterface} from "../interfaces/EventInterface";
import {RelationshipInterface} from "../../../services/relationships/interfaces/RelationshipInterface";
import {DateService} from "../../../services/date/DateService";

export class EventTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.EventList;

	protected generateContentElement<T extends ComponentModelInterface>(
		index: number,
		fieldType: TableField,
		component: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const event: EventInterface = <unknown>component as EventInterface;
		switch (fieldType) {
			case TableField.Date:
				return this.factories.contents.create(this.api.services.get<DateService>(DateService)?.getReadableDate((<EventInterface>(<unknown>component)).date, component), ContentType.Date, true);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
