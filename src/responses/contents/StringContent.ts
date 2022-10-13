import {AbstractContent} from "../abstracts/AbstractContent";

export class StringContent extends AbstractContent {
	public content: string;

	public fillContent(
		container: HTMLElement|undefined,
		sourcePath: string,
	): void {
		if (container === undefined) return;

		container.textContent = (this.content != null ? this.content : '');
	}
}
