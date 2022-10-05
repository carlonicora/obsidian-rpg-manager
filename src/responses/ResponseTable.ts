import {AbstractResponse} from "./abstracts/AbstractResponse";
import {ResponseType} from "./enums/ResponseType";
import {TableResponseInterface} from "./interfaces/TableResponseInterface";
import {ContentInterface} from "./contents/interfaces/ContentInterface";
import {App} from "obsidian";
import {ComponentType} from "../databases/enums/ComponentType";
import {ComponentInterface} from "../databases/interfaces/ComponentInterface";

export class ResponseTable extends AbstractResponse implements TableResponseInterface {
	public class: string|null;
	public headers: Array<ContentInterface>;
	public content: Array<Array<ContentInterface>>;
	public create: ComponentType|undefined;
	public campaignId: number|undefined;
	public adventureId: number|undefined;
	public actId: number|undefined;
	public open: boolean;

	constructor(
		app: App,
		currentElement: ComponentInterface,
	) {
		super(app, currentElement);
		this.responseType = ResponseType.Table;
		this.class = null;
		this.headers = [];
		this.content = [];
		this.open = true;
	}

	public addHeaders(
		headers: Array<ContentInterface>,
	): void {
		this.headers = headers;
	}

	public addContent(
		content: Array<any>,
	): void {
		this.content.push(content);
	}

	public addContentList(
		content: Array<Array<any>>,
	): void {
		this.content = content;
	}
}
