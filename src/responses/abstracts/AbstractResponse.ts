import {ResponseType} from "../enums/ResponseType";
import {ResponseDataElementInterface} from "../interfaces/ResponseDataElementInterface";
import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {App} from "obsidian";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";

export abstract class AbstractResponse extends AbstractRpgManager implements ResponseDataElementInterface {
	public responseType: ResponseType;
	public title: string|null;

	constructor(
		app: App,
		public currentComponent: ComponentInterface,
	) {
		super(app);
	}

	addTitle(
		title: string,
	): void {
		this.title = title;
	}
}
