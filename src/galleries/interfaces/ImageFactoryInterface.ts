import {ImageInterface} from "./ImageInterface";

export interface ImageFactoryInterface {
	create(
		path: string,
		caption?: string,
	): ImageInterface|undefined;
}
