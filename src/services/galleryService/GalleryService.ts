import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {GalleryServiceInterface} from "./interfaces/GalleryServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
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
	private _imageExtensions: string[] = ["jpeg", "jpg", "png", "webp"];

	public views: Map<GalleryViewType, any> = new Map<GalleryViewType, any>([
		[GalleryViewType.ModalNavigation, GalleryNavigationModalView],
		[GalleryViewType.ModalList, GalleryListModalView],
		[GalleryViewType.ModalEdit, GalleryEditModalView],
		[GalleryViewType.ModalAddLocal, GalleryAddLocalModalView],
		[GalleryViewType.ModalAddRemote, GalleryAddRemoteModalView],
		[GalleryViewType.ModalUpload, GalleryUploadModalView],
	]);

	get imageExtensions(): string[] {
		return this._imageExtensions;
	}

	public createView(
		type: GalleryViewType,
		model: ModelInterface,
	): GalleryViewInterface {
		const view = this.views.get(type);
		if (view === undefined) throw new Error('');

		const response: GalleryViewInterface = new view(this.api, this);
		response.model = model;

		return response;
	}
}
