import {TFile} from "obsidian";

export interface TemplateInterface {
	generateData(
		existingFile?: TFile,
	): Promise<string>;
}
