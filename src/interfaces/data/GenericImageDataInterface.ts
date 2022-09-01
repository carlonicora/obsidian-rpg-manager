import {GenericDataInterface} from "./GenericDataInterface";

export interface GenericImageDataInterface extends GenericDataInterface{
	imageSrc: string|null;
	image: string;
	imageSrcElement: HTMLImageElement|null;

	getImage(
		width: number,
		height: number,
	): string;
}
