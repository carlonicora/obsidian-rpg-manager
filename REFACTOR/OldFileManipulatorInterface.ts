import {CachedMetadata, TFile} from "obsidian";
import {FilePatternPositionInterface} from "./services/manipulators/interfaces/FilePatternPositionInterface";

export interface OldFileManipulatorInterface {
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
	): Promise<boolean>;

	patternPosition(
		pattern: string[],
	): FilePatternPositionInterface|undefined;

	replacePattern(
		patternPosition: FilePatternPositionInterface,
		content: string[],
	): Promise<void>;

	get content(): string;
	get arrayContent(): string[];
}
