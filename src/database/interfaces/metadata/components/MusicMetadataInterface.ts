import {ComponentMetadataInterface} from "./ComponentMetadataInterface";
import {MusicDataMetadataInterface} from "../data/MusicDataMetadataInterface";

export interface MusicMetadataInterface extends ComponentMetadataInterface {
	data?: MusicDataMetadataInterface;
}
