import {ResponseType} from "../../enums/ResponseType";
import {ComponentInterface} from "../database/ComponentInterface";

export interface ResponseDataElementInterface {
	currentElement: ComponentInterface;
	responseType: ResponseType;
	title: string|null;

	addTitle(
		title: string,
	): void;
}
