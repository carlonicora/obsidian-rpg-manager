import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {HeaderResponseElementInterface} from "../../interfaces/response/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../enums/HeaderResponseType";
import {App} from "obsidian";
import {ContentType} from "../../enums/ContentType";
import {ContentInterface} from "../../interfaces/ContentInterface";

export class ResponseHeaderElement extends AbstractResponse implements HeaderResponseElementInterface {
	public value: ContentInterface;

	constructor(
		app: App,
		public title: string,
		content: string,
		public type: HeaderResponseType,
		public additionalInformation: any|undefined=undefined,
	) {
		super(app);
		this.value = this.factories.contents.create(content, ContentType.Markdown);
	}
}
