import {AbstractResponse} from "../abstracts/AbstractResponse";
import {HeaderResponseInterface} from "../interfaces/response/subModels/HeaderResponseInterface";
import {App} from "obsidian";
import {ResponseType} from "../enums/ResponseType";
import {ContentInterface} from "../interfaces/ContentInterface";
import {HeaderResponseElementInterface} from "../interfaces/response/subModels/HeaderResponseElementInterface";
import {ComponentType} from "../enums/ComponentType";
import {ComponentInterface} from "../database/interfaces/ComponentInterface";

export class ResponseHeader extends AbstractResponse implements HeaderResponseInterface {
	public type: ComponentType;
	public link: ContentInterface;
	public name: string;
	public imgSrc: string|null|undefined;
	public imgWidth: number;
	public imgHeight: number;
	public elements: Array<HeaderResponseElementInterface>;
	public metadata: any|null;

	constructor(
		app: App,
		currentElement: ComponentInterface,
	) {
		super(app, currentElement);
		this.responseType = ResponseType.Header;
		this.elements = [];
	}

	public addElement(
		element: HeaderResponseElementInterface,
	): void {
		this.elements.push(element);
	}
}
