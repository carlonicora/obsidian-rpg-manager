import {AbstractRelationshipView} from "../../../managers/viewsManager/abstracts/AbstractRelationshipView";
import {RelationshipsViewInterface} from "../../../managers/viewsManager/interfaces/RelationshipsViewInterface";
import {TableField} from "../../../services/relationshipsService/enums/TableField";
import {MusicInterface} from "../interfaces/MusicInterface";

export class MusicRelationshipView extends AbstractRelationshipView implements RelationshipsViewInterface{
	protected getFieldValue(
		field: TableField,
		model: MusicInterface,
	): string {
		switch (field){
			case TableField.Url:
				return model.url ?? '';
		}
		return '';
	}
}
