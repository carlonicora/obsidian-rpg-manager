import {AbstractContent} from "../../abstracts/AbstractContent";

export class NumberContent extends AbstractContent {
	protected content: number;

	public fillContent(
		container: HTMLElement,
		sourcePath: string,
	): void {
		container.textContent = (this.content != null ? this.content.toString() : '');
	}
}
