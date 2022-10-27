import {ContentType} from "../responses/enums/ContentType";
import {AbstractTableSubModel} from "../models/abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../src/settings/RpgManagerSettingsInterface";
import {ContentInterface} from "../responses/contents/interfaces/ContentInterface";
import {TableField} from "../views/enums/TableField";
import {ModelInterface} from "../../src/api/modelsManager/interfaces/ModelInterface";
import {MusicInterface} from "../../src/components/music/interfaces/MusicInterface";
import {RelationshipInterface} from "../../src/services/relationshipsService/interfaces/RelationshipInterface";

export class MusicTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.MusicList;

	protected generateContentElement<T extends ModelInterface>(
		index: number,
		fieldType: TableField,
		component: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const music: MusicInterface = <unknown>component as MusicInterface;
		switch (fieldType) {
			case TableField.Url:
				return this.factories.contents.create((music.url ?? '<span class="rpgm-missing">No URL provided</span>'), ContentType.Markdown);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
