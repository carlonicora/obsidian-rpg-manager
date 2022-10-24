import {TFile} from "obsidian";
import {RelationshipInterface} from "../../relationships/interfaces/RelationshipInterface";
import {FileManipulatorInterface} from "./FileManipulatorInterface";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {ControllerMetadataDataInterface} from "../../../core/controller/interfaces/ControllerMetadataDataInterface";
import {ImageInterface} from "../../galleries/interfaces/ImageInterface";

export interface CodeBlockManipulatorInterface {
	read(
		fileManipulator: FileManipulatorInterface,
		component: ComponentModelInterface,
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

	removeImage(
		path: string,
	): Promise<void>;

	addOrUpdateImage(
		source: string,
		caption: string,
	): Promise<ImageInterface|undefined>;

	selectData(
	): void;

	replaceID(
		file: TFile,
		ID: string,
	): Promise<void>;
}
