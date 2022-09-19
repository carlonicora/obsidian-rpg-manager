import {AbstractComponentView} from "../../abstracts/AbstractComponentView";
import {ImageResponseInterface} from "../../interfaces/response/ImageResponseInterface";

export class ImageView extends AbstractComponentView {
	public render(
		container: HTMLElement,
		data: ImageResponseInterface,
	): void {
		if (data.imgSrc != null){
			const divContainer = container.createDiv();

			const image = new Image(data.width, data.height);
			image.src = data.imgSrc;
			image.style.objectFit = 'cover';
			divContainer.append(image);
		}
	}
}
