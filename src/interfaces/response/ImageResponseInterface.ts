import {ResponseElementInterface} from "./ResponseElementInterface";

export interface ImageResponseInterface extends ResponseElementInterface {
	imgSrc: string|null;
	width: number;
	height: number;
}
