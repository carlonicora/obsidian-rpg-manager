import {ResponseElementInterface} from "./ResponseElementInterface";
import {ContentInterface} from "../ContentInterface";
import {HeaderResponseElementInterface} from "./HeaderResponseElementInterface";

export interface HeaderResponseInterface extends ResponseElementInterface {
	link: ContentInterface;
	name: string;
	imgSrc: string|null;
	imgWidth: number;
	imgHeight: number;

	elements: Array<HeaderResponseElementInterface>;

	addElement(element: HeaderResponseElementInterface): void;
}
