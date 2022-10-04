import {ComponentMetadataInterface} from "./ComponentMetadataInterface";
import {FactionDataMetadataInterface} from "../data/FactionDataMetadataInterface";

export interface FactionMetadataInterface extends ComponentMetadataInterface {
	data?: FactionDataMetadataInterface;
}
