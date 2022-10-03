import {ContentType} from "../../../enums/ContentType";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../enums/TableField";
import {ComponentInterface} from "../../../database/interfaces/ComponentInterface";
import {ClueInterface} from "../../../database/components/interfaces/ClueInterface";
import {RelationshipInterface} from "../../../database/relationships/interfaces/RelationshipInterface";

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
				return this.factories.contents.create((clue.found !== undefined ? clue.found?.toDateString() : '<span class="rpgm-missing">no</span>'), ContentType.Date);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
