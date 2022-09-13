import {ResponseElementInterface} from "./ResponseElementInterface";

export interface ImageResponseInterface extends ResponseElementInterface {
	imgSrc: string|null|undefined;
	width: number;
	height: number;
}
