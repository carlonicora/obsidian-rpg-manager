import {ResponseType} from "../enums/ResponseType";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {AbstractRpgManager} from "./AbstractRpgManager";
import {App} from "obsidian";
import {RecordInterface} from "../interfaces/database/RecordInterface";

export abstract class AbstractResponse extends AbstractRpgManager implements ResponseElementInterface {
	public responseType: ResponseType;
	public title: string|null;

	constructor(
		app: App,
		public currentElement: RecordInterface,
	) {
		super(app);
	}

	addTitle(
		title: string,
	): void {
		this.title = title;
	}
}
