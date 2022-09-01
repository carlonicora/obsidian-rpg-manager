import {ResponseType} from "../enums/ResponseType";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";

export abstract class AbstractResponse implements ResponseElementInterface {
	public responseType: ResponseType;
	public title: string|null;

	addTitle(
		title: string,
	): void {
		this.title = title;
	}
}
