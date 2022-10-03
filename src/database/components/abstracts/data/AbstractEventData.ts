import {AbstractComponent} from "../../../abstracts/AbstractComponent";
import {EventDataInterface} from "../../interfaces/data/EventDataInterface";
import {EventMetadataInterface} from "../../../interfaces/metadata/components/EventMetadataInterface";

export abstract class AbstractEventData extends AbstractComponent implements EventDataInterface {
	protected metadata: EventMetadataInterface;

	get date(): Date | undefined {
		return (this.metadata.data?.date ? new Date(this.metadata.data.date) : undefined);
	}
}
