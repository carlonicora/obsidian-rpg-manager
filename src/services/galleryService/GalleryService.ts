import {AbstractService} from "../../api/servicesManager/abstracts/AbstractService";
import {GalleryServiceInterface} from "./interfaces/GalleryServiceInterface";
import {ServiceInterface} from "../../api/servicesManager/interfaces/ServiceInterface";
import {App, TFile} from "obsidian";
import {ImageInterface} from "./interfaces/ImageInterface";
import {Image} from "./data/Image";

export class GalleryService extends AbstractService implements GalleryServiceInterface, ServiceInterface {
	private _root: string;
	private _imageExtensions: string[] = ["jpeg", "jpg", "png", "webp"];

	constructor(
		app: App,
	) {
		super(app);

		const file = app.vault.getAbstractFileByPath('/');
		this._root = app.vault.getResourcePath(file as TFile);
		if (this._root.includes("?"))
			this._root = this._root.substring(0, this._root.lastIndexOf("?"));

		if (!this._root.endsWith("/"))
			this._root += "/";
	}

	get imageExtensions(): string[] {
		return this._imageExtensions;
	}

	get root(): string {
		return this._root;
	}

	public createImage(
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

		return  this._root + path;
	}
}
