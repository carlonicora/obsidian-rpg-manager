import { ElementType } from "../enums/ElementType";
import { ImageInterface } from "./ImageInterface";

export interface SearchableElementInterface {
	name: string;
	path: string;
	type: ElementType;
	alias?: string;
	image?: ImageInterface;
}
