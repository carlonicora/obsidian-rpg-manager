import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {HeaderResponseInterface} from "../../interfaces/response/HeaderResponseInterface";
import {App} from "obsidian";
import {ResponseType} from "../../enums/ResponseType";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {HeaderResponseElementInterface} from "../../interfaces/response/HeaderResponseElementInterface";

export class ResponseHeader extends AbstractResponse implements HeaderResponseInterface {
	public link: ContentInterface;
	public name: string;
	public imgSrc: string|null|undefined;
	public imgWidth: number;
	public imgHeight: number;
	public elements: Array<HeaderResponseElementInterface>;

	constructor(
		app: App,
	) {
		super(app);
		this.responseType = ResponseType.Header;
		this.elements = [];
	}

	public addElement(
		element: HeaderResponseElementInterface,
	): void {
		this.elements.push(element);
	}
}
