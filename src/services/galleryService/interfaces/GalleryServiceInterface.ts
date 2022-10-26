import {ImageInterface} from "./ImageInterface";

export interface GalleryServiceInterface {
	get root(): string;
	get imageExtensions(): string[];

	createImage(
		path: string,
		caption?: string,
	): ImageInterface|undefined;
}
