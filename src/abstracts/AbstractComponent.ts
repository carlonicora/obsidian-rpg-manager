import {ComponentInterface} from "../interfaces/ComponentInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {RpgDataInterface} from "../Data";

export abstract class AbstractComponent implements ComponentInterface {
	constructor(
	) {
	}

	abstract generateData(
		data: RpgDataInterface[]|RpgDataInterface,
		title: string|null,
	): ResponseElementInterface|null;
}
