import {ResponseType} from "../../enums/ResponseType";
import {RecordInterface} from "../database/RecordInterface";

export interface ResponseElementInterface {
	currentElement: RecordInterface;
	responseType: ResponseType;
	title: string|null;

	addTitle(
		title: string,
	): void;
}
