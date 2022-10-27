import {CodeblockDataWorkerInterface} from "../interfaces/CodeblockDataWorkerInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {CodeblockDomainInterface} from "../interfaces/CodeblockDomainInterface";
import {CodeblockKeyInterface} from "../interfaces/CodeblockKeyInterface";

export class CodeblockKeyWorker  implements CodeblockDataWorkerInterface {
	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	public async addOrUpdate(
		domain: CodeblockDomainInterface,
		data: CodeblockKeyInterface,
	): Promise<any> {
		const parts: string[] = data.key.split('.');
		let key: any = domain.codeblock;

		for (let index=0; index<parts.length; index++){
			if (key[parts[index]] === undefined)
				key[parts[index]] = {};

			key = key[parts[index]];
		}

		key = data.value;
	}

	public async remove(
		domain: CodeblockDomainInterface,
		path: string,
	): Promise<void> {
		const parts: string[] = path.split('.');
		let key: any = domain.codeblock;

		for (let index=0; index<parts.length; index++){
			if (key[parts[index]] === undefined)
				key[parts[index]] = {};

			key = key[parts[index]];
		}

		//TODO Check this
		delete domain.codeblock[key];
	}
}
