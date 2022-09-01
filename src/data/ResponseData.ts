import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";

export class ResponseData implements ResponseDataInterface {
	public elements: ResponseElementInterface[];

	constructor() {
		this.elements = [];
	}

	public addElement(
		element: ResponseElementInterface
	): void {
		this.elements.push(element);
	}
}
