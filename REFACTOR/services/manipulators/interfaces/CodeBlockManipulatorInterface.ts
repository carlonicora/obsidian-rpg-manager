import {TFile} from "obsidian";
import {RelationshipInterface} from "../../../../src/services/relationshipsService/interfaces/RelationshipInterface";
import {OldFileManipulatorInterface} from "../../../../src/services/fileManipulatorService/interfaces/OldFileManipulatorInterface";
import {ModelInterface} from "../../../../src/api/modelsManager/interfaces/ModelInterface";
import {ControllerMetadataDataInterface} from "../../../../src/api/controllerManager/interfaces/ControllerMetadataDataInterface";
import {ImageInterface} from "../../../../src/services/galleryService/interfaces/ImageInterface";

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
