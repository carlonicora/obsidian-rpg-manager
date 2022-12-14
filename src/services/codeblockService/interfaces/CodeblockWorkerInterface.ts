import {TFile} from "obsidian";
import {CodeblockDomainInterface} from "./CodeblockDomainInterface";

export interface CodeblockWorkerInterface {
	readContent(
		isFrontmatter: boolean,
		file?: TFile,
		codeblockName?: string,
	): Promise<CodeblockDomainInterface|undefined>;

	tryReadOpenContent(
		file: TFile,
		codeblockName?: string,
	): Promise<CodeblockDomainInterface|undefined>;

	updateContent(
		domain: CodeblockDomainInterface,
	): Promise<boolean>;
}
