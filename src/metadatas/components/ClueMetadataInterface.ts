import {ComponentMetadataInterface} from "./ComponentMetadataInterface";
import {ClueDataMetadataInterface} from "../data/ClueDataMetadataInterface";

export interface ClueMetadataInterface extends ComponentMetadataInterface {
	data?: ClueDataMetadataInterface;
}
