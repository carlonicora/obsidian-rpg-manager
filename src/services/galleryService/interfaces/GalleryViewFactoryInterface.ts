import {GalleryViewInterface} from "./GalleryViewInterface";
import {GalleryViewType} from "../enums/GalleryViewType";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";

export interface GalleryViewFactoryInterface {
	create(
		type: GalleryViewType,
		component: ModelInterface,
	): GalleryViewInterface;
}
