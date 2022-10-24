import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";
import {CharacterDataMetadataInterface} from "./CharacterDataMetadataInterface";

export interface CharacterMetadataInterface extends ComponentMetadataInterface {
	data?: CharacterDataMetadataInterface;
}
