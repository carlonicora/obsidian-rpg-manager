import {AbstractComponentV2} from "../abstracts/AbstractComponentV2";
import {EventMetadataInterface} from "../metadatas/interfaces/EventMetadataInterface";
import {EventV2Interface} from "./interfaces/EventV2Interface";

export class EventV2 extends AbstractComponentV2 implements EventV2Interface {
	protected metadata: EventMetadataInterface;

	public get date(): Date | undefined {
		return (this.metadata.date ? new Date(this.metadata.date) : undefined);
	}
}
