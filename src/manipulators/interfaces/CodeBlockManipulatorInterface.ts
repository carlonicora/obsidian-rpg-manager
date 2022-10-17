import {TFile} from "obsidian";
import {RelationshipInterface} from "../../relationships/interfaces/RelationshipInterface";
import {FileManipulatorInterface} from "./FileManipulatorInterface";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";
import {ControllerMetadataDataInterface} from "../../controller/interfaces/ControllerMetadataDataInterface";
import {ImageInterface} from "../../galleries/interfaces/ImageInterface";

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
