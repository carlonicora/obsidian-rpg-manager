import {EventMetadataInterface} from "../interfaces/metadata/components/EventMetadataInterface";
import {EventInterface} from "./interfaces/EventInterface";
import {AbstractEventData} from "./abstracts/data/AbstractEventData";

export class Event extends AbstractEventData implements EventInterface {
	protected metadata: EventMetadataInterface;
}
