export interface FileEditorInterface {
	read(
	): Promise<boolean>;

	getCodeBloksMetadata(
	): Array<any>;

	getCodeBlockMetadata(
		codeBlockIdentifier: string,
	): any|undefined;

	maybeReplaceCodeBlockMetadata(
		codeBlockIdentifier: string,
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
