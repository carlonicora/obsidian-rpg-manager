import {CachedMetadata} from "obsidian";

export interface FileManipulatorInterface {
	cachedFile: CachedMetadata;

	get content(): string;
	get contentArray(): string[];

	maybeWrite(
		content: string,
	): Promise<boolean>;

	read(
	): Promise<boolean>;
}
