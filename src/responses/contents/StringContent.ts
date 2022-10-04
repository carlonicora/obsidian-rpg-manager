import {AbstractContent} from "../../abstracts/AbstractContent";

export class StringContent extends AbstractContent {
	public content: string;

	public fillContent(
		container: HTMLElement,
		sourcePath: string,
	): void {
		container.textContent = (this.content != null ? this.content : '');
	}
}
