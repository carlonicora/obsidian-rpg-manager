import {AbstractContent} from "../../abstracts/AbstractContent";

export class DateContent extends AbstractContent {
	public content: string;

	public fillContent(
		container: HTMLElement,
		sourcePath: string,
	): void {
		container.textContent = (this.content != null ? this.content : '');
	}
}
