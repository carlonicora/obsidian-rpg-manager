import {ViewInterface} from "../views/interfaces/ViewInterface";
import {ResponseDataElementInterface} from "../responses/interfaces/ResponseDataElementInterface";
import {App} from "obsidian";
import {AbstractRpgManager} from "./AbstractRpgManager";

export abstract class AbstractSubModelView extends AbstractRpgManager implements ViewInterface {
	constructor(
		app: App,
		protected sourcePath: string,
	) {
		super(app);
	}

	abstract render(
		container: HTMLElement,
		data: ResponseDataElementInterface,
	): void;
}
