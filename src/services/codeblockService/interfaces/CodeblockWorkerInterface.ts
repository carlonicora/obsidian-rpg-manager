import {TFile} from "obsidian";
import {CodeblockDomainInterface} from "./CodeblockDomainInterface";
import {CodeblockDataWorkerInterface} from "./CodeblockDataWorkerInterface";

export interface CodeblockWorkerInterface {
	readContent(
		codeblockName?: string,
		file?: TFile,
	): Promise<CodeblockDomainInterface|undefined>;

	updateContent(
		domain: CodeblockDomainInterface,
	): Promise<boolean>;
}
