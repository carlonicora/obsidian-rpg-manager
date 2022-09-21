import {ResponseType} from "../enums/ResponseType";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {AbstractRpgManager} from "./AbstractRpgManager";

export abstract class AbstractResponse extends AbstractRpgManager implements ResponseElementInterface {
	public responseType: ResponseType;
	public title: string|null;

	addTitle(
		title: string,
	): void {
		this.title = title;
	}
}
