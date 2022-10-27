import {ImageInterface} from "../../galleryService/interfaces/ImageInterface";

export interface ImageServiceInterface {
	createImage(
		path: string,
		caption?: string,
	): ImageInterface|undefined;
}
