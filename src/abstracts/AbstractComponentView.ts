import {ViewInterface} from "../interfaces/ViewInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {App} from "obsidian";
import {AbstractRpgManager} from "./AbstractRpgManager";

export abstract class AbstractComponentView extends AbstractRpgManager implements ViewInterface {
	constructor(
		app: App,
		protected sourcePath: string,
	) {
		super(app);
	}

	abstract render(
		container: HTMLElement,
		data: ResponseElementInterface,
	): void;
}
