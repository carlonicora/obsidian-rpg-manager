import {ContentType} from "../../../enums/ContentType";
import {MusicInterface} from "../../../interfaces/components/MusicInterface";
import {RelationshipInterface} from "../../../interfaces/RelationshipInterface";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {ComponentInterface} from "../../../interfaces/database/ComponentInterface";
import {TableField} from "../../../enums/TableField";

export class MusicTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.MusicList;

	protected generateContentElement<T extends ComponentInterface>(
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
