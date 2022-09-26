import {ContentType} from "../../enums/ContentType";
import {ClueInterface} from "../../interfaces/data/ClueInterface";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {AbstractTableComponent} from "../../abstracts/AbstractTableComponent";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {RpgManagerAdvancedSettingsListsInterface} from "../../settings/RpgManagerSettingsInterface";

export class ClueTableComponent extends AbstractTableComponent {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.ClueList;

	protected generateHeaderElement(
		fieldName: string,
	): ContentInterface|undefined {
		switch (fieldName.toLowerCase()) {
			case 'found':
				return this.factories.contents.create('Found', ContentType.String);
				break;
		}

		return super.generateHeaderElement(fieldName);
	}

	protected generateContentElement<T extends RecordInterface>(
		index: number,
		fieldName: string,
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const clue: ClueInterface = <unknown>record as ClueInterface;
		switch (fieldName.toLowerCase()) {
			case 'found':
				return this.factories.contents.create((clue.isFound ? clue.found?.toDateString() : '<span class="rpgm-missing">no</span>'), ContentType.Date);
				break;
		}

		return super.generateContentElement(index, fieldName, record, relationship);
	}
}
