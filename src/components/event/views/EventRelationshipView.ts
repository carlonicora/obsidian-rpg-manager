import {AbstractRelationshipView} from "../../../managers/viewsManager/abstracts/AbstractRelationshipView";
import {RelationshipsViewInterface} from "../../../managers/viewsManager/interfaces/RelationshipsViewInterface";
import {TableField} from "../../../services/relationshipsService/enums/TableField";
import {EventInterface} from "../interfaces/EventInterface";
import {DateService} from "../../../services/dateService/DateService";

export class EventRelationshipView extends AbstractRelationshipView implements RelationshipsViewInterface {
	protected getFieldValue(
		field: TableField,
		model: EventInterface,
	): string {
		switch (field){
			case TableField.Date:
				return this.api.service(DateService).getReadableDate(model.date, model);
		}

		return '';
	}
}
