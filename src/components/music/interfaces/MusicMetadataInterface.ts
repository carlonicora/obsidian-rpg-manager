import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";
import {MusicDataMetadataInterface} from "./MusicDataMetadataInterface";

export interface MusicMetadataInterface extends ComponentMetadataInterface {
	data?: MusicDataMetadataInterface;
}
