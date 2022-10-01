import {TFile} from "obsidian";

export interface MetadataReaderInterface {
	read(
		file: TFile,
	): Promise<any>;
}
