import {AbstractRelationshipView} from "../../../managers/viewsManager/abstracts/AbstractRelationshipView";
import {RelationshipsViewInterface} from "../../../managers/viewsManager/interfaces/RelationshipsViewInterface";
import {TableField} from "../../../services/relationshipsService/enums/TableField";
import {LocationInterface} from "../interfaces/LocationInterface";

export class LocationRelationshipView extends AbstractRelationshipView implements RelationshipsViewInterface {
	protected getFieldValue(
		field: TableField,
		model: LocationInterface,
	): string {
		return '';
	}
}
