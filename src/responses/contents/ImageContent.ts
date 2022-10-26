import {AbstractContent} from "../abstracts/AbstractContent";
import {ImageInterface} from "../../services/galleryService/interfaces/ImageInterface";

export class ImageContent extends AbstractContent {
	public content: ImageInterface[];

	public fillContent(
		container: HTMLElement|undefined,
		sourcePath: string,
	): void {
		if (container === undefined) return;

		if (this.content != null && this.content.length > 0){
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

			image.src = this.content[0].src;
		} else {
			container.textContent = '';
		}
	}
}
