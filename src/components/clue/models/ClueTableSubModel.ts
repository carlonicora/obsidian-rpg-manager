import {ContentType} from "../../../../REFACTOR/responses/enums/ContentType";
import {AbstractTableSubModel} from "../../../../REFACTOR/models/abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../../REFACTOR/responses/contents/interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../../REFACTOR/views/enums/TableField";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {ClueInterface} from "../interfaces/ClueInterface";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";
import {DateService} from "../../../../REFACTOR/services/dateService/DateService";

export class ClueTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.ClueList;

	protected generateHeaderElement(
		fieldType: TableField,
	): ContentInterface|undefined {
		switch (fieldType) {
			case TableField.Found:
				return this.factories.contents.create('Found', ContentType.String);
				break;
		}

		return super.generateHeaderElement(fieldType);
	}

	protected generateContentElement<T extends ModelInterface>(
		index: number,
		fieldType: TableField,
		component: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const clue: ClueInterface = <unknown>component as ClueInterface;
		switch (fieldType) {
			case TableField.Found:
				return this.factories.contents.create(
					(this.api.service(DateService).getReadableDate(clue.found, clue) !== undefined
						? this.api.service(DateService).getReadableDate(clue.found, clue)
						: '<span class="rpgm-missing">no</span>'
					),
					ContentType.Date
				);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
