import {ComponentInterface} from "../interfaces/ComponentInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {App} from "obsidian";
import {RecordInterface} from "../interfaces/database/RecordInterface";

export abstract class AbstractComponent implements ComponentInterface {
	constructor(
		protected app: App,
	) {
	}

	abstract generateData(
		data: RecordInterface[] | RecordInterface,
		title: string | null,
		additionalInformation: any | null,
	): Promise<ResponseElementInterface | null>;
}
