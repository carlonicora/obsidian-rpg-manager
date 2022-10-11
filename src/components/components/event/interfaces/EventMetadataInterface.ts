import {ComponentMetadataInterface} from "../../../interfaces/ComponentMetadataInterface";
import {EventDataMetadataInterface} from "./EventDataMetadataInterface";

export interface EventMetadataInterface extends ComponentMetadataInterface {
	data?: EventDataMetadataInterface;

}
