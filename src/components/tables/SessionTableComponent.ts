import {ContentType} from "../../enums/ContentType";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {SessionInterface} from "../../interfaces/data/SessionInterface";
import {AbstractTableComponent} from "../../abstracts/AbstractTableComponent";
import {RpgManagerAdvancedSettingsListsInterface} from "../../settings/RpgManagerSettingsInterface";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {TableField} from "../../enums/TableField";

export class SessionTableComponent extends AbstractTableComponent {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.SessionList;

	protected generateContentElement<T extends RecordInterface>(
		index: number,
		fieldType: TableField,
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const session: SessionInterface = <unknown>record as SessionInterface;
		switch (fieldType) {
			case TableField.Index:
				return this.factories.contents.create(session.sessionId, ContentType.String, true);
				break;
			case TableField.Date:
				return this.factories.contents.create(session.irl?.toDateString(), ContentType.Date, true);
				break;
		}

		return super.generateContentElement(index, fieldType, record, relationship);
	}
}
