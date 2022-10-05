import {ControllerMetadataModelInterface} from "./ControllerMetadataModelInterface";
import {ControllerMetadataDataInterface} from "./ControllerMetadataDataInterface";

export interface ControllerMetadataInterface extends ControllerMetadataDataInterface{
	models: ControllerMetadataModelInterface;
}
