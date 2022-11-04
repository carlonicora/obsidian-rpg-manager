import {AbstractRelationshipView} from "../../../managers/viewsManager/abstracts/AbstractRelationshipView";
import {RelationshipsViewInterface} from "../../../managers/viewsManager/interfaces/RelationshipsViewInterface";
import {TableField} from "../../../services/relationshipsService/enums/TableField";
import {SubplotInterface} from "../interfaces/SubplotInterface";

export class SubplotRelationshipView extends AbstractRelationshipView implements RelationshipsViewInterface {
	protected getFieldValue(
		field: TableField,
		model: SubplotInterface,
	): string {
		return '';
	}
}
