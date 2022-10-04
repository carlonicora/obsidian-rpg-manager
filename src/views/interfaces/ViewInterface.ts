import {ResponseDataElementInterface} from "../../responses/interfaces/ResponseDataElementInterface";

export interface ViewInterface {
	render(
		container: HTMLElement,
		data: ResponseDataElementInterface,
	): void;
}
