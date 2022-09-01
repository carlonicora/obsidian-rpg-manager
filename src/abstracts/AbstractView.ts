import {ViewInterface} from "../interfaces/ViewInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";

export abstract class AbstractView implements ViewInterface {
	constructor(
		protected sourcePath: string,
	) {
	}

	abstract render(
		container: HTMLElement,
		data: ResponseElementInterface,
	): void;
}
