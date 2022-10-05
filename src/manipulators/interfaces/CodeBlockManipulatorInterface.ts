import {TFile} from "obsidian";
import {RelationshipInterface} from "../../relationships/interfaces/RelationshipInterface";

export interface CodeBlockManipulatorInterface {
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
}
