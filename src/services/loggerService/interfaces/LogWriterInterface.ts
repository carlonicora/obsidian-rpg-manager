import {LogMessageInterface} from "./LogMessageInterface";
import {LogGroupInterface} from "./LogGroupInterface";

export interface LogWriterInterface{
	maybeWriteLog(
		log: LogMessageInterface,
		duration?: number,
	): Promise<void>;

	maybeWriteLogList(
		logs: LogGroupInterface,
	): Promise<void>;
}
