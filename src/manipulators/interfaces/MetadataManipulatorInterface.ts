import {ComponentInterface} from "../../databases/interfaces/ComponentInterface";
import {ControllerMetadataDataInterface} from "../../metadatas/controllers/ControllerMetadataDataInterface";
import {FileManipulatorInterface} from "./FileManipulatorInterface";

export interface MetadataManipulatorInterface {
	read(
		fileManipulator: FileManipulatorInterface,
		component: ComponentInterface,
	): Promise<ControllerMetadataDataInterface>;
}
