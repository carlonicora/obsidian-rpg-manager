import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {GalleryServiceInterface} from "./interfaces/GalleryServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {TFile} from "obsidian";
import {ImageInterface} from "./interfaces/ImageInterface";
import {Image} from "./data/Image";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {GalleryViewType} from "./enums/GalleryViewType";
import {GalleryNavigationModalView} from "./views/modals/GalleryNavigationModalView";
import {GalleryListModalView} from "./views/modals/GalleryListModalView";
import {GalleryEditModalView} from "./views/modals/GalleryEditModalView";
import {GalleryAddLocalModalView} from "./views/modals/GalleryAddLocalModalView";
import {GalleryAddRemoteModalView} from "./views/modals/GalleryAddRemoteModalView";
import {GalleryUploadModalView} from "./views/modals/GalleryUploadModalView";
import {GalleryViewInterface} from "./interfaces/GalleryViewInterface";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";

export class GalleryService extends AbstractService implements GalleryServiceInterface, ServiceInterface {
	private _root: string;
	private _imageExtensions: string[] = ["jpeg", "jpg", "png", "webp"];

	public views: Map<GalleryViewType, any> = new Map<GalleryViewType, any>([
		[GalleryViewType.ModalNavigation, GalleryNavigationModalView],
		[GalleryViewType.ModalList, GalleryListModalView],
		[GalleryViewType.ModalEdit, GalleryEditModalView],
		[GalleryViewType.ModalAddLocal, GalleryAddLocalModalView],
		[GalleryViewType.ModalAddRemote, GalleryAddRemoteModalView],
		[GalleryViewType.ModalUpload, GalleryUploadModalView],
	]);

	constructor(
		api: RpgManagerApiInterface,
	) {
		super(api);

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
			return undefined;

		const response = new Image(path, imageLocation);
		if (caption !== undefined)
			response.caption = caption;

		return response;
	}

	public createView(
		type: GalleryViewType,
		model: ModelInterface,
	): GalleryViewInterface {
		const view = this.views.get(type);
		if (view === undefined) throw new Error('');

		const response: GalleryViewInterface = new view(this.api);
		response.model = model;

		return response;
	}

	private _getImageLocation(
		path: string
	): string|undefined {
		if (path.startsWith('http'))
			return path;

		if (this.api.app.vault.getAbstractFileByPath(path) === undefined)
			return undefined;

		return  this._root + path;
	}
}
