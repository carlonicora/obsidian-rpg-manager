import {AbstractContent} from "../../abstracts/AbstractContent";

export class ImageContent extends AbstractContent {
	public content: string;

	public fillContent(
		container: HTMLElement,
		sourcePath: string,
	): void {
		if (this.content != null){
			const image = new Image(75, 75);
			image.src = this.content;
			image.style.objectFit = 'cover';

			container.append(image);
			container.style.width = image.style.width;
		} else {
			container.textContent = '';
		}
	}
}
