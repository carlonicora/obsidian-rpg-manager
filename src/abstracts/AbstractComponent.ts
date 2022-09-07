import {ComponentInterface} from "../interfaces/ComponentInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {App} from "obsidian";
import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";

export abstract class AbstractComponent implements ComponentInterface {
	constructor(
		protected app: App,
	) {
	}

	abstract generateData(
		data: RpgDataInterface[]|RpgDataInterface,
		title: string|null,
	): ResponseElementInterface|null;
}
