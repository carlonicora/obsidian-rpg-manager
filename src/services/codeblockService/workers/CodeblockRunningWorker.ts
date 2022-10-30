import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {CodeblockDataWorkerInterface} from "../interfaces/CodeblockDataWorkerInterface";
import {CodeblockDomainInterface} from "../interfaces/CodeblockDomainInterface";

export class CodeblockRunningWorker implements CodeblockDataWorkerInterface {
	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	public async addOrUpdate(
		domain: CodeblockDomainInterface,
		data: any,
	): Promise<any> {
		if (domain.codeblock.data.durations === undefined)
			domain.codeblock.data.durations = [];

		const durations: string[] = domain.codeblock.data.durations;

		for (let index = 0; index < durations.length; index++) {
			if (durations[index].indexOf('-') === -1) {
				return;
			}
		}

		durations.push(Math.floor(Date.now()/1000).toString());
	}

	public async remove(
		domain: CodeblockDomainInterface,
		path: string,
	): Promise<void> {
		const durations: string[] = domain.codeblock.data.durations;

		for (let index=0; index<durations.length; index++){
			if (durations[index].indexOf('-') === -1){
				const end:number = Math.floor(Date.now()/1000);
				const start:number = +durations[index];

				durations[index] = durations[index] + '-' + end.toString();

				if (domain.codeblock.data.duration === undefined){
					domain.codeblock.data.duration = 0;
				}

				domain.codeblock.data.duration += (end - start);

				break;
			}
		}
	}
}
