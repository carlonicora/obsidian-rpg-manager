import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";
import {FactionDataMetadataInterface} from "./FactionDataMetadataInterface";

export interface FactionMetadataInterface extends ComponentMetadataInterface {
	data?: FactionDataMetadataInterface;
}
