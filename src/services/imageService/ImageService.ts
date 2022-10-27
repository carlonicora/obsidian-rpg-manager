import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {ImageServiceInterface} from "./interfaces/ImageServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {ImageInterface} from "../galleryService/interfaces/ImageInterface";
import {Image} from "../galleryService/data/Image";

export class ImageService extends AbstractService implements ImageServiceInterface, ServiceInterface {
	public createImage(
		path: string,
		caption?: string,
	): ImageInterface|undefined {
		const imageLocation = this._getImageLocation(path);

		if (imageLocation === undefined)
			return undefined;

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

		if (this.api.app.vault.getAbstractFileByPath(path) === undefined)
			return undefined;

		return  this.api.root + path;
	}
}
