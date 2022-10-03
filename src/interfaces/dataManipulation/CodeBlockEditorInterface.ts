import {TFile} from "obsidian";

export interface CodeBlockEditorInterface {
	update(
		identifier: string,
		value: string|boolean|number|undefined,
	): Promise<void>;

	stopCurrentDuration(
		file: TFile,
	): Promise<void>;

	startNewDuration(
		file: TFile,
	): Promise<void>;
}
