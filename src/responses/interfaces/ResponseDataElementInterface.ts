import {ResponseType} from "../enums/ResponseType";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";

export interface ResponseDataElementInterface {
	currentComponent: ComponentModelInterface;
	responseType: ResponseType;
	title: string|null;

	addTitle(
		title: string,
	): void;
}
