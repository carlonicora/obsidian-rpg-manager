import {CachedMetadata, Editor, EditorPosition, TFile} from "obsidian";

export interface CodeblockDomainInterface {
	editor?: Editor;
	file: TFile;
	originalFileContent: string,
	cache: CachedMetadata;
	codeblock: any;
	codeblockStart: EditorPosition;
	codeblockEnd: EditorPosition;
	codeblockContent: string;
	originalCodeblockContent: string;
	isFrontmatter: boolean,
}
