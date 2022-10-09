import {TFile} from "obsidian";
import {RelationshipInterface} from "../../relationships/interfaces/RelationshipInterface";
import {FileManipulatorInterface} from "./FileManipulatorInterface";
import {ComponentInterface} from "../../databases/interfaces/ComponentInterface";
import {ControllerMetadataDataInterface} from "../../metadatas/controllers/ControllerMetadataDataInterface";

export interface CodeBlockManipulatorInterface {
	read(
		fileManipulator: FileManipulatorInterface,
		component: ComponentInterface,
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

	addOrUpdateRelationship(
		relationship: RelationshipInterface,
	): Promise<void>;

	removeRelationship(
		path: string,
	): Promise<void>;

	selectRelationship(
		path: string,
	): void;

	selectData(
	): void;
}
