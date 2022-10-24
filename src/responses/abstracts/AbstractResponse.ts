import {ResponseType} from "../enums/ResponseType";
import {ResponseDataElementInterface} from "../interfaces/ResponseDataElementInterface";
import {AbstractRpgManager} from "../../core/abstracts/AbstractRpgManager";
import {App} from "obsidian";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";

export abstract class AbstractResponse extends AbstractRpgManager implements ResponseDataElementInterface {
	public responseType: ResponseType;
	public title: string|null;

	constructor(
		app: App,
		public currentComponent: ComponentModelInterface,
	) {
		super(app);
	}

	addTitle(
		title: string,
	): void {
		this.title = title;
	}
}
