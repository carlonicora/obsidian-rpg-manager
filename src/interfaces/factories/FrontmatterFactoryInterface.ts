import {TFile} from "obsidian";

export interface FrontmatterFactoryInterface {
	update(
		file: TFile,
		keyValues: Map<string, any>,
	): Promise<void>;

	remove(
		file: TFile,
		keyValues: Map<string, any>,
	): Promise<void>;
}
