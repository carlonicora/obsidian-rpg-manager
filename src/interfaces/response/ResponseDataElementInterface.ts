import {ResponseType} from "../../enums/ResponseType";
import {ComponentV2Interface} from "../../_dbV2/interfaces/ComponentV2Interface";

export interface ResponseDataElementInterface {
	currentElement: ComponentV2Interface;
	responseType: ResponseType;
	title: string|null;

	addTitle(
		title: string,
	): void;
}
