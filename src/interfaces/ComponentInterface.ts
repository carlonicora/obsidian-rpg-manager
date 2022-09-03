import {ResponseElementInterface} from "./response/ResponseElementInterface";
import {GenericDataListInterface} from "./data/GenericDataListInterface";
import {GenericDataInterface} from "./data/GenericDataInterface";
import {GenericImageDataInterface} from "./data/GenericImageDataInterface";

export interface ComponentInterface {
	generateData(
		data: GenericDataListInterface|GenericDataInterface|GenericImageDataInterface,
		title: string|null,
	): ResponseElementInterface|null;
}
