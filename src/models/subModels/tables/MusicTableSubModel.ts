import {ContentType} from "../../../enums/ContentType";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {TableField} from "../../../enums/TableField";
import {ComponentV2Interface} from "../../../_dbV2/interfaces/ComponentV2Interface";
import {MusicV2Interface} from "../../../_dbV2/components/interfaces/MusicV2Interface";
import {RelationshipV2Interface} from "../../../_dbV2/relationships/interfaces/RelationshipV2Interface";

export class MusicTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.MusicList;

	protected generateContentElement<T extends ComponentV2Interface>(
		index: number,
		fieldType: TableField,
		component: T,
		relationship: RelationshipV2Interface,
	): ContentInterface|undefined {
		const music: MusicV2Interface = <unknown>component as MusicV2Interface;
		switch (fieldType) {
			case TableField.Url:
				return this.factories.contents.create((music.url ?? '<span class="rpgm-missing">No URL provided</span>'), ContentType.Markdown);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
