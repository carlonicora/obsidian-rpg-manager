import {ContentType} from "../../../responses/enums/ContentType";
import {AbstractTableSubModel} from "../../../REFACTOR/models/abstracts/AbstractTableSubModel";
import {ContentInterface} from "../../../responses/contents/interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {TableField} from "../../../REFACTOR/views/enums/TableField";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {AdventureInterface} from "../interfaces/AdventureInterface";
import {RelationshipInterface} from "../../../services/relationships/interfaces/RelationshipInterface";

export class AdventureTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.AdventureList;

	protected generateContentElement<T extends ComponentModelInterface>(
		index: number,
		fieldType:  TableField,
		component: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const adventure: AdventureInterface = <unknown>component as AdventureInterface;
		switch (fieldType) {
			case  TableField.Index:
				return this.factories.contents.create(adventure.id.adventureId, ContentType.Number, true);
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
