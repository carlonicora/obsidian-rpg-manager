import {ResponseElementInterface} from "./ResponseElementInterface";

export interface ResponseDataInterface {
	elements: ResponseElementInterface[];

	addElement(
		element: ResponseElementInterface|null
	): void;
}
