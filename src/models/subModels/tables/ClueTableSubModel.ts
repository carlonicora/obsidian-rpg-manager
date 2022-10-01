import {ContentType} from "../../../enums/ContentType";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../enums/TableField";
import {ComponentV2Interface} from "../../../_dbV2/interfaces/ComponentV2Interface";
import {ClueV2Interface} from "../../../_dbV2/components/interfaces/ClueV2Interface";
import {RelationshipV2Interface} from "../../../_dbV2/relationships/interfaces/RelationshipV2Interface";

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

	protected generateContentElement<T extends ComponentV2Interface>(
		index: number,
		fieldType: TableField,
		component: T,
		relationship: RelationshipV2Interface,
	): ContentInterface|undefined {
		const clue: ClueV2Interface = <unknown>component as ClueV2Interface;
		switch (fieldType) {
			case TableField.Found:
				return this.factories.contents.create((clue.found !== undefined ? clue.found?.toDateString() : '<span class="rpgm-missing">no</span>'), ContentType.Date);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
