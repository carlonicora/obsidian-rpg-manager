import {SceneDataMetadataInterface} from "./SceneDataMetadataInterface";
import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";

export interface SceneMetadataInterface extends ComponentMetadataInterface{
	data?: SceneDataMetadataInterface;
}
