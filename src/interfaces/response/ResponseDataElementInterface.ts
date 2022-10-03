import {ResponseType} from "../../enums/ResponseType";
import {ComponentInterface} from "../../database/interfaces/ComponentInterface";

export interface ResponseDataElementInterface {
	currentElement: ComponentInterface;
	responseType: ResponseType;
	title: string|null;

	addTitle(
		title: string,
	): void;
}
