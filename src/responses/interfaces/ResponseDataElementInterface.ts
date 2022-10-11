import {ResponseType} from "../enums/ResponseType";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";

export interface ResponseDataElementInterface {
	currentComponent: ComponentInterface;
	responseType: ResponseType;
	title: string|null;

	addTitle(
		title: string,
	): void;
}
