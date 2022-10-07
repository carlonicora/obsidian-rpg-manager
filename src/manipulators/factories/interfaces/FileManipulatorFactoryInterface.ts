import {TFile} from "obsidian";
import {FileManipulatorInterface} from "../../interfaces/FileManipulatorInterface";

export interface FileManipulatorFactoryInterface {
	create(
		file: TFile,
		fileContent?: string,
	): Promise<FileManipulatorInterface|undefined>;
}
