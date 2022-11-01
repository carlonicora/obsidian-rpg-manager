import {RelationshipsViewInterface} from "../../../managers/viewsManager/interfaces/RelationshipsViewInterface";
import {AbstractRelationshipView} from "../../../managers/viewsManager/abstracts/AbstractRelationshipView";
import {TableField} from "../../../services/relationshipsService/enums/TableField";
import {ClueInterface} from "../interfaces/ClueInterface";
import {DateService} from "../../../services/dateService/DateService";

export class ClueRelationshipView extends AbstractRelationshipView implements RelationshipsViewInterface {
	render(
	): void {
	}

	protected getFieldValue(
		field: TableField,
		relatedModel: ClueInterface,
	): string {
		switch (field){
			case TableField.Found:
				return this.api.service(DateService).getReadableDate(relatedModel.found, relatedModel);
		}

		return '';
	}
}
