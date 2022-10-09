import {CachedMetadata, TFile} from "obsidian";
import {FilePatternPositionInterface} from "./FilePatternPositionInterface";

export interface FileManipulatorInterface {
	file: TFile;
	cachedFile: CachedMetadata;

	read(
	): Promise<boolean>;
	
	getCodeBlockMetadata(
	): any|undefined;

	maybeReplaceCodeBlockMetadata(
		newMetadata: any,
	): Promise<void>;

	maybeWrite(
		newContent: string,
	): Promise<void>;

	patternPosition(
		pattern: Array<string>,
	): FilePatternPositionInterface|undefined;

	replacePattern(
		patternPosition: FilePatternPositionInterface,
		content: Array<string>,
	): Promise<void>;

	get content(): string;
	get arrayContent(): Array<string>;
}
