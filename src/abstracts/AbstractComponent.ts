import {ComponentInterface} from "../interfaces/ComponentInterface";
import {IoInterface} from "../interfaces/IoInterface";
import {GenericDataListInterface} from "../interfaces/data/GenericDataListInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {GenericDataInterface} from "../interfaces/data/GenericDataInterface";
import {GenericImageDataInterface} from "../interfaces/data/GenericImageDataInterface";

export abstract class AbstractComponent implements ComponentInterface {
	constructor(
		protected io: IoInterface,
	) {
	}

	abstract generateData(
		data: GenericDataListInterface|GenericDataInterface|GenericImageDataInterface,
		title: string|null,
	): ResponseElementInterface|null;
}
