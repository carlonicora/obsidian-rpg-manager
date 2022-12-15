import {AbstractRelationshipView} from "../../../managers/viewsManager/abstracts/AbstractRelationshipView";
import {RelationshipsViewInterface} from "../../../managers/viewsManager/interfaces/RelationshipsViewInterface";
import {TableField} from "../../../services/relationshipsService/enums/TableField";
import {SessionInterface} from "../interfaces/SessionInterface";
import {DateService} from "../../../services/dateService/DateService";

export class SessionRelationshipView extends AbstractRelationshipView implements RelationshipsViewInterface {
	protected canBeOrdered = true;

	protected getFieldValue(
		field: TableField,
		model: SessionInterface,
	): string {
		if (field === TableField.Date)
			return this.api.service(DateService).getReadableDate(model.irl, model);

		return '';
	}
}
