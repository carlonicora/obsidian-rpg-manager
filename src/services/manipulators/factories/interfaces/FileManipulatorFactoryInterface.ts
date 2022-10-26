import {TFile} from "obsidian";
import {OldFileManipulatorInterface} from "../../../fileManipulatorService/interfaces/OldFileManipulatorInterface";

export interface FileManipulatorFactoryInterface {
	create(
		file: TFile,
		fileContent?: string,
	): Promise<OldFileManipulatorInterface|undefined>;
}
