import {LogMessageInterface} from "./LogMessageInterface";

export interface LogGroupInterface {
	logs: Array<LogMessageInterface>;

	add(
		log: LogMessageInterface
	):Promise<void>;
}
