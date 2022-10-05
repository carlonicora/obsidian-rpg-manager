export interface ContentInterface {
	isInLine: boolean;
	content: any|null;
	additionalInfo?: any|undefined;
	isEditable?: boolean;

	fillContent(
		container: HTMLElement,
		sourcePath: string,
	): void;
}
