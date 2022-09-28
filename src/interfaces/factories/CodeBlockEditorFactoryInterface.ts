export interface CodeBlockEditorFactoryInterface {
	update(
		codeBlockName: string,
		identifier: string,
		value: string|boolean|number|undefined,
	): Promise<void>;
}
