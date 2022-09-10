import {ResponseElementInterface} from "./ResponseElementInterface";

export interface ResponseDataInterface {
	elements: ResponseElementInterface[];

	addElement(
		element: ResponseElementInterface|null,
		position: number|null,
	): void;
}
