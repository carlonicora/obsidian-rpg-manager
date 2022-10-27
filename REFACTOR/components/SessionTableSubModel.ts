import {ContentType} from "../responses/enums/ContentType";
import {AbstractTableSubModel} from "../models/abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../src/settings/RpgManagerSettingsInterface";
import {ContentInterface} from "../responses/contents/interfaces/ContentInterface";
import {TableField} from "../views/enums/TableField";
import {ModelInterface} from "../../src/api/modelsManager/interfaces/ModelInterface";
import {SessionInterface} from "../../src/components/session/interfaces/SessionInterface";
import {RelationshipInterface} from "../../src/services/relationshipsService/interfaces/RelationshipInterface";
import {DateService} from "../../../../REFACTOR/services/dateService/DateService";

export class SessionTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.SessionList;

	protected generateContentElement<T extends ModelInterface>(
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
				return this.factories.contents.create(this.api.service(DateService).getReadableDate(session.irl, session), ContentType.Date, true);
				break;
		}

		return super.generateContentElement(index, fieldType, component, relationship);
	}
}
