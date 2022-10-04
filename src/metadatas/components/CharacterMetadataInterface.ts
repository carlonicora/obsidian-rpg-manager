import {ComponentMetadataInterface} from "./ComponentMetadataInterface";
import {CharacterDataMetadataInterface} from "../data/CharacterDataMetadataInterface";

export interface CharacterMetadataInterface extends ComponentMetadataInterface {
	data?: CharacterDataMetadataInterface;
}
