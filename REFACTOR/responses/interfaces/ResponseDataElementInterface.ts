import {ResponseType} from "../enums/ResponseType";

export interface ResponseDataElementInterface {
	currentComponent: any;
	responseType: ResponseType;
	title: string|null;

	addTitle(
		title: string,
	): void;
}
