import {AbstractContent} from "../abstracts/AbstractContent";

export class ImageContent extends AbstractContent {
	public content: string;

	public fillContent(
		container: HTMLElement|undefined,
		sourcePath: string,
	): void {
		if (container === undefined) return;

		if (this.content != null){
			const image = new Image(75, 75);

			image.onerror = (evt: Event|string) => {
				container.textContent = '';
				return;
			};

			image.onload = (evt: Event) => {
				image.style.objectFit = 'cover';

				container.append(image);
				container.style.width = image.style.width;
			};

			image.src = this.content;
		} else {
			container.textContent = '';
		}
	}
}
