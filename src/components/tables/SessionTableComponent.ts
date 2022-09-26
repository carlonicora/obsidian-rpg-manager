import {ContentType} from "../../enums/ContentType";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {SessionInterface} from "../../interfaces/data/SessionInterface";
import {AbstractTableComponent} from "../../abstracts/AbstractTableComponent";
import {RpgManagerAdvancedSettingsListsInterface} from "../../settings/RpgManagerSettingsInterface";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";

export class SessionTableComponent extends AbstractTableComponent {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.SessionList;

	protected generateContentElement<T extends RecordInterface>(
		index: number,
		fieldName: string,
		record: T,
		relationship: RelationshipInterface,
	): ContentInterface|undefined {
		const session: SessionInterface = <unknown>record as SessionInterface;
		switch (fieldName.toLowerCase()) {
			case 'index':
				return this.factories.contents.create(session.sessionId, ContentType.String, true);
				break;
			case 'date':
				return this.factories.contents.create(session.irl?.toDateString(), ContentType.Date, true);
				break;
		}

		return super.generateContentElement(index, fieldName, record, relationship);
	}
}
