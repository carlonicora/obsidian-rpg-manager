import {ResponseElementInterface} from "./ResponseElementInterface";
import {ContentInterface} from "../ContentInterface";
import {HeaderResponseElementInterface} from "./HeaderResponseElementInterface";
import {RecordType} from "../../enums/RecordType";

export interface HeaderResponseInterface extends ResponseElementInterface {
	type: RecordType;
	link: ContentInterface;
	name: string;
	imgSrc: string|null|undefined;
	imgWidth: number;
	imgHeight: number;
	metadata: any|null;

	elements: Array<HeaderResponseElementInterface>;

	addElement(element: HeaderResponseElementInterface): void;
}
