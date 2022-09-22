import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {ResponseType} from "../../enums/ResponseType";
import {TableResponseInterface} from "../../interfaces/response/TableResponseInterface";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {App} from "obsidian";
import {RecordType} from "../../enums/RecordType";

export class ResponseTable extends AbstractResponse implements TableResponseInterface {
	public class: string|null;
	public headers: Array<ContentInterface>;
	public content: Array<Array<ContentInterface>>;
	public create: RecordType|undefined;
	public campaignId: number|undefined;
	public adventureId: number|undefined;
	public sessionId: number|undefined;

	constructor(
		app: App,
	) {
		super(app);
		this.responseType = ResponseType.Table;
		this.class = null;
		this.headers = [];
		this.content = [];
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
