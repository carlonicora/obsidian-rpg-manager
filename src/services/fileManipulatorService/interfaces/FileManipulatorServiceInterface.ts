import {TFile} from "obsidian";
import {FileManipulatorInterface} from "./FileManipulatorInterface";
import {FilePatternPositionInterface} from "./FilePatternPositionInterface";

export interface FileManipulatorServiceInterface {
	read(
		file: TFile,
	): Promise<FileManipulatorInterface|undefined>;

	maybeWrite(
		file: TFile,
		content: string,
	): Promise<void>;

	patternPosition(
		fileManipulator: FileManipulatorInterface,
		pattern: string[],
	): FilePatternPositionInterface|undefined;

	replacePattern(
		fileManipulator: FileManipulatorInterface,
		patternPosition: FilePatternPositionInterface,
		content: string[],
	): Promise<void>;
}
