import {SceneDataMetadataInterface} from "./data/SceneDataMetadataInterface";
import {ComponentMetadataInterface} from "./ComponentMetadataInterface";

export interface SceneMetadataInterface extends ComponentMetadataInterface{
	data?: SceneDataMetadataInterface;
}
