import {GalleryViewInterface} from "./GalleryViewInterface";
import {GalleryViewType} from "../enums/GalleryViewType";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";

export interface GalleryViewFactoryInterface {
	create(
		type: GalleryViewType,
		component: ComponentModelInterface,
	): GalleryViewInterface;
}
