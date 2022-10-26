import {TFile} from "obsidian";
import {RelationshipInterface} from "../../relationshipsService/interfaces/RelationshipInterface";
import {OldFileManipulatorInterface} from "../../fileManipulatorService/interfaces/OldFileManipulatorInterface";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {ControllerMetadataDataInterface} from "../../../api/controllerManager/interfaces/ControllerMetadataDataInterface";
import {ImageInterface} from "../../galleryService/interfaces/ImageInterface";

export interface CodeBlockManipulatorInterface {
	read(
		fileManipulator: OldFileManipulatorInterface,
		component: ModelInterface,
	): Promise<ControllerMetadataDataInterface>;
	
	update(
		identifier: string,
		value: string|boolean|number|undefined,
	): Promise<void>;

	updateInFile(
		file: TFile,
		identifier: string,
		value: string|boolean|number|undefined,
	): Promise<void>

	stopCurrentDuration(
		file: TFile,
	): Promise<void>;

	startNewDuration(
		file: TFile,
	): Promise<void>;

	selectData(
	): void;
}
