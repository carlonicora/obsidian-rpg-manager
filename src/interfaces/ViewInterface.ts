import {ResponseDataElementInterface} from "./response/ResponseDataElementInterface";

export interface ViewInterface {
	render(
		container: HTMLElement,
		data: ResponseDataElementInterface,
	): void;
}
