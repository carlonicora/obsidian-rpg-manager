import {LogMessageInterface} from "./LogMessageInterface";

export interface LogGroupInterface {
	logs: Array<LogMessageInterface>;
	start: number;

	add(
		log: LogMessageInterface
	):Promise<void>;
}
