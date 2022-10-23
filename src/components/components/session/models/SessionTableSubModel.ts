import {ContentType} from "../../../../responses/enums/ContentType";
import {AbstractTableSubModel} from "../../../../models/abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../../settings/RpgManagerSettingsInterface";
import {ContentInterface} from "../../../../responses/contents/interfaces/ContentInterface";
import {TableField} from "../../../../views/enums/TableField";
import {ComponentInterface} from "../../../interfaces/ComponentInterface";
import {SessionInterface} from "../interfaces/SessionInterface";
import {RelationshipInterface} from "../../../../relationships/interfaces/RelationshipInterface";
import {DateService} from "../../../../services/date/DateService";

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
				let irl = this.api.service.get<DateService>(DateService)?.getReadableDate(session.irl, session);
				return this.factories.contents.create(irl, ContentType.Date, true);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
