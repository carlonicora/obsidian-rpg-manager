import {ResponseType} from "../enums/ResponseType";
import {ResponseDataElementInterface} from "../interfaces/response/ResponseDataElementInterface";
import {AbstractRpgManager} from "./AbstractRpgManager";
import {App} from "obsidian";
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";

export abstract class AbstractResponse extends AbstractRpgManager implements ResponseDataElementInterface {
	public responseType: ResponseType;
	public title: string|null;

	constructor(
		app: App,
		public currentElement: ComponentV2Interface,
	) {
		super(app);
	}

	addTitle(
		title: string,
	): void {
		this.title = title;
	}
}
