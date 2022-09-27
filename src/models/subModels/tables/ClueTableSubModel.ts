import {ContentType} from "../../../enums/ContentType";
import {ClueInterface} from "../../../interfaces/components/ClueInterface";
import {RelationshipInterface} from "../../../interfaces/RelationshipInterface";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {ComponentInterface} from "../../../interfaces/database/ComponentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../enums/TableField";

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
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const clue: ClueInterface = <unknown>record as ClueInterface;
		switch (fieldType) {
			case TableField.Found:
				return this.factories.contents.create((clue.isFound ? clue.found?.toDateString() : '<span class="rpgm-missing">no</span>'), ContentType.Date);
				break;
		}

		return super.generateContentElement(index, fieldType, record, relationship);
	}
}
