import {LogType} from "../enums/LogType";
import {LogMessageType} from "../enums/LogMessageType";

export interface LogMessageInterface {
	type: LogType,
	messageType: LogMessageType,
	message: string,
	object?: any|undefined,
}
