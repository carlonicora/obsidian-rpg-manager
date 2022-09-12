import {AbstractContent} from "../../abstracts/AbstractContent";

export class ImageContent extends AbstractContent {
	public content: HTMLElement;

	public fillContent(
		container: HTMLElement,
		sourcePath: string,
	): void {
		if (this.content != null){
			this.content.style.width = '75px';
			this.content.style.height = '75px';
			this.content.style.objectFit = 'cover';

			container.append(this.content);
			container.style.width = this.content.style.width;
		} else {
			container.textContent = '';
		}
	}
}
