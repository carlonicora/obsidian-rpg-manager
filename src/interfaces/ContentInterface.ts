export interface ContentInterface {
	isInLine: boolean;
	content: any|null;

	fillContent(
		container: HTMLElement,
		sourcePath: string,
	): void;
}
