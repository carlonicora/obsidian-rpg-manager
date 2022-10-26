import {TFile} from "obsidian";
import {FileManipulatorInterface} from "./FileManipulatorInterface";

export interface FileManipulatorServiceInterface {
	read(
		file: TFile,
	): Promise<FileManipulatorInterface|undefined>;
}
