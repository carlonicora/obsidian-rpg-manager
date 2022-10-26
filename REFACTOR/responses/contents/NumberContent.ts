import {AbstractContent} from "../abstracts/AbstractContent";

export class NumberContent extends AbstractContent {
	public content: number;

	public fillContent(
		container: HTMLElement|undefined,
		sourcePath: string,
	): void {
		if (container === undefined) return;

		container.textContent = (this.content != null ? this.content.toString() : '');
	}
}
