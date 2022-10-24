import {AbstractFactory} from "../../../core/abstracts/AbstractFactory";
import {ImageFactoryInterface} from "../interfaces/ImageFactoryInterface";
import {ImageInterface} from "../interfaces/ImageInterface";
import {Image} from "../data/Image";
import {AbstractComponentData} from "../../../core/abstracts/AbstractComponentData";

export class ImageFactory extends AbstractFactory implements ImageFactoryInterface {
	public create(
		path: string,
		caption?: string,
	): ImageInterface|undefined {
		const imageLocation = this._getImageLocation(path);

		if (imageLocation === undefined)
			return undefined

		const response = new Image(path, imageLocation);
		if (caption !== undefined)
			response.caption = caption;

		return response;
	}

	private _getImageLocation(
		path: string
	): string|undefined {
		if (path.startsWith('http'))
			return path;

		if (this.app.vault.getAbstractFileByPath(path) === undefined)
			return undefined;

		if (AbstractComponentData.root === undefined)
			AbstractComponentData.initialiseRoots(this.app);

		return  AbstractComponentData.root + path;
	}
}
