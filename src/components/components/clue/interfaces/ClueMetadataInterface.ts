import {ComponentMetadataInterface} from "../../../interfaces/ComponentMetadataInterface";
import {ClueDataMetadataInterface} from "./ClueDataMetadataInterface";

export interface ClueMetadataInterface extends ComponentMetadataInterface {
	data?: ClueDataMetadataInterface;
}
