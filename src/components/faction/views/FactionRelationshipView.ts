import {AbstractRelationshipView} from "../../../managers/viewsManager/abstracts/AbstractRelationshipView";
import {RelationshipsViewInterface} from "../../../managers/viewsManager/interfaces/RelationshipsViewInterface";
import {FactionInterface} from "../interfaces/FactionInterface";
import {TableField} from "../../../services/relationshipsService/enums/TableField";

export class FactionRelationshipView extends AbstractRelationshipView implements RelationshipsViewInterface {
	protected getFieldValue(
		field: TableField,
		model: FactionInterface,
	): string {
		return '';
	}
}
