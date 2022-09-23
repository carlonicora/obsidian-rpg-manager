import {TFile} from "obsidian";

export interface FrontmatterFactoryInterface {
	update(
		file: TFile,
		keyValues: Map<string, string>,
	): Promise<void>;
}
