import {ContentType} from "../../../enums/ContentType";
import {AbstractTableSubModel} from "../../../abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {ContentInterface} from "../../../interfaces/ContentInterface";
import {TableField} from "../../../enums/TableField";
import {ComponentInterface} from "../../../database/interfaces/ComponentInterface";
import {SessionInterface} from "../../../database/components/interfaces/SessionInterface";
import {RelationshipInterface} from "../../../database/relationships/interfaces/RelationshipInterface";

export class SessionTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.SessionList;

	protected generateContentElement<T extends ComponentInterface>(
		index: number,
		fieldType: TableField,
		component: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const session: SessionInterface = <unknown>component as SessionInterface;
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
