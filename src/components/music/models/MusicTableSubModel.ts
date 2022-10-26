import {ContentType} from "../../../../REFACTOR/responses/enums/ContentType";
import {AbstractTableSubModel} from "../../../../REFACTOR/models/abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {ContentInterface} from "../../../../REFACTOR/responses/contents/interfaces/ContentInterface";
import {TableField} from "../../../../REFACTOR/views/enums/TableField";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {MusicInterface} from "../interfaces/MusicInterface";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";

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
