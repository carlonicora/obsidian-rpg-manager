export interface ContentInterface {
	isInLine: boolean;
	content: any|null;
	additionalInfo?: any|undefined;

	fillContent(
		container: HTMLElement,
		sourcePath: string,
	): void;
}
