import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {ResponseType} from "../../enums/ResponseType";
import {TableResponseInterface} from "../../interfaces/response/TableResponseInterface";
import {ContentInterface} from "../../interfaces/content/ContentInterface";

export class ResponseTable extends AbstractResponse implements TableResponseInterface {
	public headers: Array<ContentInterface>;
	public content: Array<Array<ContentInterface>>;

	constructor(
	) {
		super();
		this.responseType = ResponseType.Table;
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
