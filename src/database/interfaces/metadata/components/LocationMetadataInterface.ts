import {ComponentMetadataInterface} from "./ComponentMetadataInterface";
import {LocationDataMetadataInterface} from "../data/LocationDataMetadataInterface";

export interface LocationMetadataInterface extends ComponentMetadataInterface {
	data?: LocationDataMetadataInterface;
}
