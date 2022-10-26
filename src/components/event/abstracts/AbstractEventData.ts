import {AbstractModel} from "../../../api/modelsManager/abstracts/AbstractModel";
import {EventDataInterface} from "../interfaces/EventDataInterface";
import {EventMetadataInterface} from "../interfaces/EventMetadataInterface";
import {DateHelper} from "../../../core/helpers/DateHelper";
import {DateInterface} from "../../../services/date/interfaces/DateInterface";
import {DateService} from "../../../services/date/DateService";

export abstract class AbstractEventData extends AbstractModel implements EventDataInterface {
	protected metadata: EventMetadataInterface;

	get date(): DateInterface | undefined {
		return this.api.services.get(DateService)?.getDate(
			this.metadata.data?.date,
			this.frontmatter['fc-date'],
			this,
		);
	}
}
