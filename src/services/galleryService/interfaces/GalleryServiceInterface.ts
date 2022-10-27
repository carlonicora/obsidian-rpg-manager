import {ImageInterface} from "./ImageInterface";
import {GalleryViewType} from "../enums/GalleryViewType";

export interface GalleryServiceInterface {
	views: Map<GalleryViewType, any>

	get root(): string;
	get imageExtensions(): string[];

	createImage(
		path: string,
		caption?: string,
	): ImageInterface|undefined;
}
