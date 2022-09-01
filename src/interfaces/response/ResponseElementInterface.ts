import {ResponseType} from "../../enums/ResponseType";

export interface ResponseElementInterface {
	responseType: ResponseType;
	title: string|null;

	addTitle(
		title: string,
	): void;
}
