import {LogGroupInterface} from "../interfaces/LogGroupInterface";
import {LogMessageInterface} from "../interfaces/LogMessageInterface";

export class LogGroup implements LogGroupInterface{
	public logs: Array<LogMessageInterface>;

	constructor(
	) {
		this.logs = [];
	}

	async add(
		log: LogMessageInterface
	):Promise<void> {
		this.logs.push(log)
	}
}
