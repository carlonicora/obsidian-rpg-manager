import {TFile} from "obsidian";

export interface FrontmatterManipulatorInterface {
	update(
		file: TFile,
		keyValues: Map<string, any>,
	): Promise<void>;

	remove(
		file: TFile,
		keyValues: Map<string, any>,
	): Promise<void>;
}
