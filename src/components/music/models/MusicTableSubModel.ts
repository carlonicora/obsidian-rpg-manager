import {ContentType} from "../../../responses/enums/ContentType";
import {AbstractTableSubModel} from "../../../REFACTOR/models/abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {ContentInterface} from "../../../responses/contents/interfaces/ContentInterface";
import {TableField} from "../../../REFACTOR/views/enums/TableField";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {MusicInterface} from "../interfaces/MusicInterface";
import {RelationshipInterface} from "../../../services/relationships/interfaces/RelationshipInterface";

export class MusicTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.MusicList;

	protected generateContentElement<T extends ComponentModelInterface>(
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
