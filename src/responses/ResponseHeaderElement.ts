import {AbstractResponse} from "../abstracts/AbstractResponse";
import {HeaderResponseElementInterface} from "../interfaces/response/subModels/HeaderResponseElementInterface";
import {HeaderResponseType} from "../enums/HeaderResponseType";
import {App} from "obsidian";
import {ContentType} from "../enums/ContentType";
import {ContentInterface} from "../interfaces/ContentInterface";
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";

export class ResponseHeaderElement extends AbstractResponse implements HeaderResponseElementInterface {
	public value: ContentInterface;

	constructor(
		app: App,
		currentElement: ComponentV2Interface,
		public title: string,
		content: any,
		public type: HeaderResponseType,
		public additionalInformation: any|undefined=undefined,
	) {
		super(app, currentElement);
		this.value = this.factories.contents.create(content, ContentType.Markdown);
	}
}
