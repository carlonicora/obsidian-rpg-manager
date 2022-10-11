import {AbstractResponse} from "./abstracts/AbstractResponse";
import {HeaderResponseInterface} from "./interfaces/HeaderResponseInterface";
import {App} from "obsidian";
import {ResponseType} from "./enums/ResponseType";
import {ContentInterface} from "./contents/interfaces/ContentInterface";
import {HeaderResponseElementInterface} from "./interfaces/HeaderResponseElementInterface";
import {ComponentType} from "../components/enums/ComponentType";
import {ComponentInterface} from "../components/interfaces/ComponentInterface";

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
		currentComponent: ComponentInterface,
	) {
		super(app, currentComponent);
		this.responseType = ResponseType.Header;
		this.elements = [];
	}

	public addElement(
		element: HeaderResponseElementInterface,
	): void {
		this.elements.push(element);
	}
}
