export interface ContentInterface {
	isInLine: boolean;

	fillContent(
		container: HTMLElement,
		sourcePath: string,
	): void;
}
