import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";
import {EventDataMetadataInterface} from "./EventDataMetadataInterface";

export interface EventMetadataInterface extends ComponentMetadataInterface {
	data?: EventDataMetadataInterface;

}
