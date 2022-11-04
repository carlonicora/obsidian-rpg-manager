import {CodeblockDomainInterface} from "./CodeblockDomainInterface";

export interface CodeblockDataWorkerInterface {
	addOrUpdate(
		domain: CodeblockDomainInterface,
		data: any,
	): Promise<any>;

	remove(
		domain: CodeblockDomainInterface,
		path: string,
	): Promise<void>;
}
