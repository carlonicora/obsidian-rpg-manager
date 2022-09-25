import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {BoxResponseInterface} from "../../interfaces/response/BoxResponseInterface";
import {ResponseType} from "../../enums/ResponseType";
import {App} from "obsidian";
import {RecordInterface} from "../../interfaces/database/RecordInterface";

export class ResponseBox extends AbstractResponse implements BoxResponseInterface {
	public title: string;
	public content: string|null;
	public colour = 'white';

	constructor(
		app: App,
		currentElement: RecordInterface,
	) {
		super(app, currentElement);
		this.responseType = ResponseType.Box;
	}
}
