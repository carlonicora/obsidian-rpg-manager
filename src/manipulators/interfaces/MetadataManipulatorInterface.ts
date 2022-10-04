import {TFile} from "obsidian";

export interface MetadataManipulatorInterface {
	read(
		file: TFile,
	): Promise<any>;
}
