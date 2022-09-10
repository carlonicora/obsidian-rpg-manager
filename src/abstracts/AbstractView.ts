import {ViewInterface} from "../interfaces/ViewInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {App} from "obsidian";

export abstract class AbstractView implements ViewInterface {
	constructor(
		protected app: App,
		protected sourcePath: string,
	) {
	}

	abstract render(
		container: HTMLElement,
		data: ResponseElementInterface,
	): void;
}
