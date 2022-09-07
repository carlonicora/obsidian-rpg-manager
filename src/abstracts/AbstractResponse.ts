import {ResponseType} from "../enums/ResponseType";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {App} from "obsidian";

export abstract class AbstractResponse implements ResponseElementInterface {
	public responseType: ResponseType;
	public title: string|null;

	constructor(
		protected app: App,
	) {
	}


	addTitle(
		title: string,
	): void {
		this.title = title;
	}
}
