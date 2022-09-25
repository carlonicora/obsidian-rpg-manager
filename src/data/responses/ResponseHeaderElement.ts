import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {HeaderResponseElementInterface} from "../../interfaces/response/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../enums/HeaderResponseType";
import {App} from "obsidian";
import {ContentType} from "../../enums/ContentType";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";

export class ResponseHeaderElement extends AbstractResponse implements HeaderResponseElementInterface {
	public value: ContentInterface;

	constructor(
		app: App,
		currentElement: RecordInterface,
		public title: string,
		content: string,
		public type: HeaderResponseType,
		public additionalInformation: any|undefined=undefined,
	) {
		super(app, currentElement);
		this.value = this.factories.contents.create(content, ContentType.Markdown);
	}
}
