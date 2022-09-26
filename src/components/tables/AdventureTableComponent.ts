import {ContentType} from "../../enums/ContentType";
import {AdventureInterface} from "../../interfaces/data/AdventureInterface";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {AbstractTableComponent} from "../../abstracts/AbstractTableComponent";
import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../settings/RpgManagerSettingsInterface";

export class AdventureTableComponent extends AbstractTableComponent {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.AdventureList;

	protected generateContentElement<T extends RecordInterface>(
		index: number,
		fieldName: string,
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const adventure: AdventureInterface = <unknown>record as AdventureInterface;
		switch (fieldName.toLowerCase()) {
			case 'index':
				return this.factories.contents.create(adventure.adventureId, ContentType.Number, true);
				break;
		}

		return super.generateContentElement(index, fieldName, record, relationship);
	}
}
