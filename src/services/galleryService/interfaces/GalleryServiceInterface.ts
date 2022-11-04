import {GalleryViewType} from "../enums/GalleryViewType";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {GalleryViewInterface} from "./GalleryViewInterface";

export interface GalleryServiceInterface {
	views: Map<GalleryViewType, any>

	get imageExtensions(): string[];

	createView(
		type: GalleryViewType,
		model: ModelInterface,
	): GalleryViewInterface;
}
