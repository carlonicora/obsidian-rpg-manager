import {ContentType} from "../../../enums/ContentType";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../enums/TableField";
import {ComponentV2Interface} from "../../../_dbV2/interfaces/ComponentV2Interface";
import {AdventureV2Interface} from "../../../_dbV2/components/interfaces/AdventureV2Interface";
import {RelationshipV2Interface} from "../../../_dbV2/relationships/interfaces/RelationshipV2Interface";

export class AdventureTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.AdventureList;

	protected generateContentElement<T extends ComponentV2Interface>(
		index: number,
		fieldType:  TableField,
		component: T,
		relationship: RelationshipV2Interface,
	): ContentInterface|undefined {
		const adventure: AdventureV2Interface = <unknown>component as AdventureV2Interface;
		switch (fieldType) {
			case  TableField.Index:
				return this.factories.contents.create(adventure.id.adventureId, ContentType.Number, true);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
