import {CodeblockDataWorkerInterface} from "../interfaces/CodeblockDataWorkerInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {CodeblockDomainInterface} from "../interfaces/CodeblockDomainInterface";
import {CodeblockKeyInterface} from "../interfaces/CodeblockKeyInterface";
import {YamlService} from "../../yamlService/YamlService";

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

			if (index === parts.length -1)
				key[parts[index]] = data.value;
			else
				key = key[parts[index]];

		}

		domain.codeblockContent = this._api.service(YamlService).stringify(domain.codeblock);
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

			if (index === parts.length -1)
				delete key[parts[index]];
			else
				key = key[parts[index]];

		}

		domain.codeblockContent = this._api.service(YamlService).stringify(domain.codeblock);
	}
}
