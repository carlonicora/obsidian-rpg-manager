import {EventMetadataInterface} from "./interfaces/EventMetadataInterface";
import {EventInterface} from "./interfaces/EventInterface";
import {AbstractEventData} from "./abstracts/AbstractEventData";

export class Event extends AbstractEventData implements EventInterface {
	protected metadata: EventMetadataInterface;
}
