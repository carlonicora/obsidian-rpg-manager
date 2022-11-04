import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";
import {ClueDataMetadataInterface} from "./ClueDataMetadataInterface";

export interface ClueMetadataInterface extends ComponentMetadataInterface {
	data?: ClueDataMetadataInterface;
}
