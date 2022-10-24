import {AbstractResponse} from "./abstracts/AbstractResponse";
import {HeaderResponseInterface} from "./interfaces/HeaderResponseInterface";
import {App} from "obsidian";
import {ResponseType} from "./enums/ResponseType";
import {ContentInterface} from "./contents/interfaces/ContentInterface";
import {HeaderResponseElementInterface} from "./interfaces/HeaderResponseElementInterface";
import {ComponentType} from "../core/enums/ComponentType";
import {ComponentModelInterface} from "../api/componentManager/interfaces/ComponentModelInterface";
import {ImageInterface} from "../services/galleries/interfaces/ImageInterface";

export class ResponseHeader extends AbstractResponse implements HeaderResponseInterface {
	public type: ComponentType;
	public link: ContentInterface;
	public name: string;
	public imgSrc: string|null|undefined;
	public imgWidth: number;
	public imgHeight: number;
	public elements: HeaderResponseElementInterface[];
	public metadata: any|null;
	public images: ImageInterface[];

	constructor(
		app: App,
		currentComponent: ComponentModelInterface,
	) {
		super(app, currentComponent);
		this.responseType = ResponseType.Header;
		this.elements = [];
		this.images = [];
	}

	public addElement(
		element: HeaderResponseElementInterface,
	): void {
		this.elements.push(element);
	}
}
