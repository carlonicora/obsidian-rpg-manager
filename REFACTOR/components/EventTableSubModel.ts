import {ContentType} from "../responses/enums/ContentType";
import {AbstractTableSubModel} from "../models/abstracts/AbstractTableSubModel";
import {ContentInterface} from "../responses/contents/interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../src/settings/RpgManagerSettingsInterface";
import {TableField} from "../views/enums/TableField";
import {ModelInterface} from "../../src/api/modelsManager/interfaces/ModelInterface";
import {EventInterface} from "../../src/components/event/interfaces/EventInterface";
import {RelationshipInterface} from "../../src/services/relationshipsService/interfaces/RelationshipInterface";
import {DateService} from "../../../../REFACTOR/services/dateService/DateService";

export class EventTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.EventList;

	protected generateContentElement<T extends ModelInterface>(
		index: number,
		fieldType: TableField,
		component: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		switch (fieldType) {
			case TableField.Date:
				return this.factories.contents.create(this.api.service(DateService).getReadableDate((<EventInterface>(<unknown>component)).date, component), ContentType.Date, true);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
