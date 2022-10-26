import {ResponseType} from "../enums/ResponseType";
import {ModelInterface} from "../../../src/api/modelsManager/interfaces/ModelInterface";

export interface ResponseDataElementInterface {
	currentComponent: ModelInterface;
	responseType: ResponseType;
	title: string|null;

	addTitle(
		title: string,
	): void;
}
