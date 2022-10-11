import {SceneDataMetadataInterface} from "./SceneDataMetadataInterface";
import {ComponentMetadataInterface} from "../../../interfaces/ComponentMetadataInterface";

export interface SceneMetadataInterface extends ComponentMetadataInterface{
	data?: SceneDataMetadataInterface;
}
