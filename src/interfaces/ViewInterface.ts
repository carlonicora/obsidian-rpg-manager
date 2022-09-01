import {ResponseElementInterface} from "./response/ResponseElementInterface";

export interface ViewInterface {
	render(
		container: HTMLElement,
		data: ResponseElementInterface,
	): void;
}
