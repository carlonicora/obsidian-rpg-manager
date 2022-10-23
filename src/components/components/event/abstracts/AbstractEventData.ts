import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {EventDataInterface} from "../interfaces/EventDataInterface";
import {EventMetadataInterface} from "../interfaces/EventMetadataInterface";
import {DateHelper} from "../../../../helpers/DateHelper";
import {DateInterface} from "../../../../services/date/interfaces/DateInterface";
import {DateService} from "../../../../services/date/DateService";

export abstract class AbstractEventData extends AbstractComponent implements EventDataInterface {
	protected metadata: EventMetadataInterface;

	get date(): DateInterface | undefined {
		return this.api.service.get(DateService)?.getDate(
			this.metadata.data?.date,
			this.frontmatter['fc-date'],
			this,
		);
	}
}
