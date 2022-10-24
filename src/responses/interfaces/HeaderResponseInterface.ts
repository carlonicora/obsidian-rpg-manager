import {ResponseDataElementInterface} from "./ResponseDataElementInterface";
import {ContentInterface} from "../contents/interfaces/ContentInterface";
import {HeaderResponseElementInterface} from "./HeaderResponseElementInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {ImageInterface} from "../../services/galleries/interfaces/ImageInterface";

export interface HeaderResponseInterface extends ResponseDataElementInterface {
	type: ComponentType;
	link: ContentInterface;
	name: string;
	imgSrc: string|null|undefined;
	imgWidth: number;
	imgHeight: number;
	metadata: any|null;

	elements: HeaderResponseElementInterface[];
	images: ImageInterface[];

	addElement(element: HeaderResponseElementInterface): void;
}
