import {ComponentInterface} from "../interfaces/ComponentInterface";
import {IoInterface} from "../interfaces/IoInterface";
import {GenericDataListInterface} from "../interfaces/data/GenericDataListInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";

export abstract class AbstractComponent implements ComponentInterface {
	constructor(
		protected io: IoInterface,
	) {
	}

	abstract generateData(
		data: GenericDataListInterface,
		title: string|null,
	): ResponseElementInterface|null;
}
