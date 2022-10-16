import {LogMessageInterface} from "./LogMessageInterface";

export interface LogGroupInterface {
	logs: LogMessageInterface[];
	start: number;

	add(
		log: LogMessageInterface
	):Promise<void>;
}
