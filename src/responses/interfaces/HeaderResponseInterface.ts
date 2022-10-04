import {ResponseDataElementInterface} from "./ResponseDataElementInterface";
import {ContentInterface} from "../contents/interfaces/ContentInterface";
import {HeaderResponseElementInterface} from "./HeaderResponseElementInterface";
import {ComponentType} from "../../databases/enums/ComponentType";

export interface HeaderResponseInterface extends ResponseDataElementInterface {
	type: ComponentType;
	link: ContentInterface;
	name: string;
	imgSrc: string|null|undefined;
	imgWidth: number;
	imgHeight: number;
	metadata: any|null;

	elements: Array<HeaderResponseElementInterface>;

	addElement(element: HeaderResponseElementInterface): void;
}
