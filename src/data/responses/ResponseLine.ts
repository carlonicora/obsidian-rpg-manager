import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {ResponseType} from "../../enums/ResponseType";
import {ContentType} from "../../enums/ContentType";
import {StringResponseInterface} from "../../interfaces/response/StringResponseInterface";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {App} from "obsidian";
import {RecordInterface} from "../../interfaces/database/RecordInterface";

export class ResponseLine extends AbstractResponse implements StringResponseInterface {
	public content: ContentInterface;

	constructor(
		app: App,
		currentElement: RecordInterface,
	) {
		super(app, currentElement);
		this.responseType = ResponseType.String;
		this.content = this.factories.contents.create('', ContentType.String);
	}

	public addContent(
		content: ContentInterface,
	): void {
		this.content = content;
	}
}
