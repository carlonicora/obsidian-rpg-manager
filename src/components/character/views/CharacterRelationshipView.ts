import {AbstractRelationshipView} from "../../../managers/viewsManager/abstracts/AbstractRelationshipView";
import {RelationshipsViewInterface} from "../../../managers/viewsManager/interfaces/RelationshipsViewInterface";
import {TableField} from "../../../services/relationshipsService/enums/TableField";
import {CharacterInterface} from "../interfaces/CharacterInterface";

export class CharacterRelationshipView extends AbstractRelationshipView implements RelationshipsViewInterface {
	protected getFieldValue(
		field: TableField,
		model: CharacterInterface,
	): string {
		switch (field){
			case TableField.Age:
				return model.age?.toString() ?? '';
		}

		return '';
	}
}
