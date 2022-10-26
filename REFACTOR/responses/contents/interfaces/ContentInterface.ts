export interface ContentInterface {
	isInLine: boolean;
	content: any|null;
	additionalInfo?: any|undefined;
	isEditable?: boolean;

	fillContent(
		container: HTMLElement|undefined,
		sourcePath: string,
	): void;
}
