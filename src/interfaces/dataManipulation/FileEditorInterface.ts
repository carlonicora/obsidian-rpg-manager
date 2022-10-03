export interface FileEditorInterface {
	read(
	): Promise<boolean>;

	getCodeBlocksMetadata(
	): Array<any>;

	getCodeBlockMetadata(
	): any|undefined;

	maybeReplaceCodeBlockMetadata(
		newMetadata: any,
	): Promise<void>;

	maybeWrite(
		newContent: string,
	): Promise<void>;

	maybeReplace(
		content: string,
		newContent: string,
	): Promise<void>;

	get content(): string;
	get arrayContent(): Array<string>;
}
