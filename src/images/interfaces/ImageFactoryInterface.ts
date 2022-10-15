import {ImageInterface} from "./ImageInterface";

export interface ImageFactoryInterface {
	create(
		src: string,
		caption?: string,
	): ImageInterface|undefined;
}
