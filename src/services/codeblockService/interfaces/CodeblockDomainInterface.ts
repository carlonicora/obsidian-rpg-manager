import {CachedMetadata, Editor, EditorPosition, TFile} from "obsidian";

export interface CodeblockDomainInterface {
	editor?: Editor;
	file: TFile;
	cache: CachedMetadata;
	codeblock: any;
	codeblockStart: EditorPosition;
	codeblockEnd: EditorPosition;
	codeblockContent: string;
}
