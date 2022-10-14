import {ImageInterface} from "../../interfaces/ImageInterface";

export interface ImageFactoryInterface {
	create(
		src: string,
		caption?: string,
	): ImageInterface|undefined;
}
