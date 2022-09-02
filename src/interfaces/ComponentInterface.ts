import {ResponseElementInterface} from "./response/ResponseElementInterface";
import {GenericDataListInterface} from "./data/GenericDataListInterface";

export interface ComponentInterface {
	generateData(
		data: GenericDataListInterface,
		title: string|null,
	): ResponseElementInterface|null;
}
