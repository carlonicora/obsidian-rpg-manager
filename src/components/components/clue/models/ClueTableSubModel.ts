import {ContentType} from "../../../../responses/enums/ContentType";
import {AbstractTableSubModel} from "../../../../models/abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../../responses/contents/interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../../views/enums/TableField";
import {ComponentInterface} from "../../../interfaces/ComponentInterface";
import {ClueInterface} from "../interfaces/ClueInterface";
import {RelationshipInterface} from "../../../../relationships/interfaces/RelationshipInterface";
import {DateService} from "../../../../services/date/DateService";

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

	protected generateContentElement<T extends ComponentInterface>(
		index: number,
		fieldType: TableField,
		component: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const clue: ClueInterface = <unknown>component as ClueInterface;
		switch (fieldType) {
			case TableField.Found:
				let foundDate = this.api.service.get<DateService>(DateService)?.getReadableDate(clue.found, clue);
				return this.factories.contents.create(
					(foundDate !== undefined
						? foundDate
						: '<span class="rpgm-missing">no</span>'
					),
					ContentType.Date
				);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
