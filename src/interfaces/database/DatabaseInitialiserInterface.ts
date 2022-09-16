import {DatabaseInterface} from "./DatabaseInterface";
import {TFile} from "obsidian";
import {RecordInterface} from "./RecordInterface";

export interface DatabaseInitialiserInterface {
	initialise(
	): Promise<DatabaseInterface>;

	updateFile(
		file: TFile,
	): Promise<RecordInterface|undefined>;

	deleteFile(
		file: TFile
	): Promise<void>;

	renameFile(
		file: TFile,
		previousName: string,
	): Promise<RecordInterface>;
}
