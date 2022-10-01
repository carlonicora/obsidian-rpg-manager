import {ContentType} from "../../../enums/ContentType";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {TableField} from "../../../enums/TableField";
import {ComponentV2Interface} from "../../../_dbV2/interfaces/ComponentV2Interface";
import {SessionV2Interface} from "../../../_dbV2/components/interfaces/SessionV2Interface";
import {RelationshipV2Interface} from "../../../_dbV2/relationships/interfaces/RelationshipV2Interface";

export class SessionTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.SessionList;

	protected generateContentElement<T extends ComponentV2Interface>(
		index: number,
		fieldType: TableField,
		component: T,
		relationship: RelationshipV2Interface,
	): ContentInterface|undefined {
		const session: SessionV2Interface = <unknown>component as SessionV2Interface;
		switch (fieldType) {
			case TableField.Index:
				return this.factories.contents.create(session.id.sessionId, ContentType.String, true);
				break;
			case TableField.Date:
				return this.factories.contents.create(session.irl?.toDateString(), ContentType.Date, true);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
