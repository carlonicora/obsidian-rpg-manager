import {ComponentMetadataInterface} from "../../../interfaces/ComponentMetadataInterface";
import {LocationDataMetadataInterface} from "./LocationDataMetadataInterface";

export interface LocationMetadataInterface extends ComponentMetadataInterface {
	data?: LocationDataMetadataInterface;
}
