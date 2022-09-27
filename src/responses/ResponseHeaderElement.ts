import {AbstractResponse} from "../abstracts/AbstractResponse";
import {HeaderResponseElementInterface} from "../interfaces/response/subModels/HeaderResponseElementInterface";
import {HeaderResponseType} from "../enums/HeaderResponseType";
import {App} from "obsidian";
import {ContentType} from "../enums/ContentType";
import {ContentInterface} from "../interfaces/ContentInterface";
import {ComponentInterface} from "../interfaces/database/ComponentInterface";

export class ResponseHeaderElement extends AbstractResponse implements HeaderResponseElementInterface {
	public value: ContentInterface;

	constructor(
		app: App,
		currentElement: ComponentInterface,
		public title: string,
		content: string,
		public type: HeaderResponseType,
		public additionalInformation: any|undefined=undefined,
	) {
		super(app, currentElement);
		this.value = this.factories.contents.create(content, ContentType.Markdown);
	}
}
