import {TFile} from "obsidian";
import {ComponentInterface} from "../../databases/interfaces/ComponentInterface";
import {ControllerMetadataDataInterface} from "../../metadatas/controllers/ControllerMetadataDataInterface";

export interface MetadataManipulatorInterface {
	read(
		file: TFile,
		component: ComponentInterface,
	): Promise<ControllerMetadataDataInterface>;
}
