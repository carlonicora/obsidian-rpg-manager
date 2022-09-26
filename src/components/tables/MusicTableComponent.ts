import {ContentType} from "../../enums/ContentType";
import {MusicInterface} from "../../interfaces/data/MusicInterface";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {AbstractTableComponent} from "../../abstracts/AbstractTableComponent";
import {RpgManagerAdvancedSettingsListsInterface} from "../../settings/RpgManagerSettingsInterface";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {TableField} from "../../enums/TableField";

export class MusicTableComponent extends AbstractTableComponent {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.MusicList;

	protected generateContentElement<T extends RecordInterface>(
		index: number,
		fieldType: TableField,
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const music: MusicInterface = <unknown>record as MusicInterface;
		switch (fieldType) {
			case TableField.Url:
				return this.factories.contents.create((music.url ?? '<span class="rpgm-missing">No URL provided</span>'), ContentType.Markdown);
				break;
		}

		return super.generateContentElement(index, fieldType, record, relationship);
	}
}