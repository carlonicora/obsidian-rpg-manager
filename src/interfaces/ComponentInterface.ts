import {ResponseElementInterface} from "./response/ResponseElementInterface";
import {RecordInterface} from "./database/RecordInterface";

export interface ComponentInterface {
	generateData(
		data: RecordInterface[]|RecordInterface,
		title: string|null,
		additionalInformation: any|null,
	): Promise<ResponseElementInterface|null>;
}
