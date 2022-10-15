import {AbstractImageModalView} from "../../abstracts/AbstractImageModalView";
import {ImageViewInterface} from "../../interfaces/ImageViewInterface";
import {ImageInterface} from "../../interfaces/ImageInterface";

export class ImageEditModalView extends AbstractImageModalView implements ImageViewInterface {
	private _image: ImageInterface;

	set image(image: ImageInterface) {
		this._image = image;
	}

	public render(
		containerEl: HTMLDivElement,
	): void {
		containerEl.empty();
	}
}
