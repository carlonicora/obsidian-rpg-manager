import {LogGroupInterface} from "../interfaces/LogGroupInterface";
import {LogMessageInterface} from "../interfaces/LogMessageInterface";

export class LogGroup implements LogGroupInterface{
	public logs: LogMessageInterface[];
	public start: number;

	constructor(
	) {
		this.logs = [];
		this.start = Date.now();
	}

	async add(
		log: LogMessageInterface
	):Promise<void> {
		this.logs.push(log)
	}
}
