import {DatabaseInterface} from "./DatabaseInterface";
import {TFile} from "obsidian";
import {RecordInterface} from "./RecordInterface";

export interface DatabaseInitialiserInterface {
	getDatabase(
	): Promise<DatabaseInterface>;

	loadComponent(
		file: TFile,
	): Promise<RecordInterface|undefined>;
}
