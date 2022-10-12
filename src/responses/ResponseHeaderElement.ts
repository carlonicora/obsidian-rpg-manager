import {AbstractResponse} from "./abstracts/AbstractResponse";
import {HeaderResponseElementInterface} from "./interfaces/HeaderResponseElementInterface";
import {HeaderResponseType} from "./enums/HeaderResponseType";
import {App} from "obsidian";
import {ContentType} from "./enums/ContentType";
import {ContentInterface} from "./contents/interfaces/ContentInterface";
import {ComponentInterface} from "../components/interfaces/ComponentInterface";

export class ResponseHeaderElement extends AbstractResponse implements HeaderResponseElementInterface {
	public value: ContentInterface;

	constructor(
		app: App,
		currentComponent: ComponentInterface,
		public title: string,
		content: any,
		public type: HeaderResponseType,
		public additionalInformation: any|undefined=undefined,
	) {
		super(app, currentComponent);
		this.value = this.factories.contents.create(content, ContentType.Markdown);
	}
}
