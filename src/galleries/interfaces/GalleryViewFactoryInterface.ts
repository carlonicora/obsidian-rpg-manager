import {GalleryViewInterface} from "./GalleryViewInterface";
import {GalleryViewType} from "../enums/GalleryViewType";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";

export interface GalleryViewFactoryInterface {
	create(
		type: GalleryViewType,
		component: ComponentInterface,
	): GalleryViewInterface;
}
