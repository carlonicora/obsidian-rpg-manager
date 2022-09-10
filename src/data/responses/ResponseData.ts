import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ResponseElementInterface} from "../../interfaces/response/ResponseElementInterface";

export class ResponseData implements ResponseDataInterface {
	public elements: ResponseElementInterface[];

	constructor() {
		this.elements = [];
	}

	public addElement(
		element: ResponseElementInterface|null,
		position: number|null = null,
	): void {
		if (element != null) {
			if (position == null) {
				this.elements.push(element);
			} else {
				this.elements.splice(position, 0, element);
			}
		}
	}
}
