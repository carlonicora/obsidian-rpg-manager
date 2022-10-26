import {ResponseType} from "../enums/ResponseType";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";

export interface ResponseDataElementInterface {
	currentComponent: ModelInterface;
	responseType: ResponseType;
	title: string|null;

	addTitle(
		title: string,
	): void;
}
