import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {EventDataInterface} from "../interfaces/EventDataInterface";
import {EventMetadataInterface} from "../interfaces/EventMetadataInterface";
import {DateHelper} from "../../../../helpers/DateHelper";

export abstract class AbstractEventData extends AbstractComponent implements EventDataInterface {
	protected metadata: EventMetadataInterface;

	get date(): Date | undefined {
		return (this.metadata.data?.date ? DateHelper.create(this.metadata.data.date) : undefined);
	}
}
