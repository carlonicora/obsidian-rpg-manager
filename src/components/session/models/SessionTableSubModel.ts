import {ContentType} from "../../../responses/enums/ContentType";
import {AbstractTableSubModel} from "../../../REFACTOR/models/abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../settings/RpgManagerSettingsInterface";
import {ContentInterface} from "../../../responses/contents/interfaces/ContentInterface";
import {TableField} from "../../../REFACTOR/views/enums/TableField";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {SessionInterface} from "../interfaces/SessionInterface";
import {RelationshipInterface} from "../../../services/relationships/interfaces/RelationshipInterface";
import {DateService} from "../../../services/date/DateService";

export class SessionTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.SessionList;

	protected generateContentElement<T extends ComponentModelInterface>(
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
				let irl = this.api.services.get<DateService>(DateService)?.getReadableDate(session.irl, session);
				return this.factories.contents.create(irl, ContentType.Date, true);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
