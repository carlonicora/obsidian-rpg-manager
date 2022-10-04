import {ComponentMetadataInterface} from "./ComponentMetadataInterface";
import {EventDataMetadataInterface} from "./data/EventDataMetadataInterface";

export interface EventMetadataInterface extends ComponentMetadataInterface {
	data?: EventDataMetadataInterface;

}
