import {LogMessageInterface} from "../interfaces/LogMessageInterface";
import {LogMessageType} from "../enums/LogMessageType";
import {LogType} from "../enums/LogType";

export abstract class AbstractLogMessage implements LogMessageInterface {
	public duration: number|undefined = undefined;
	public start: number;

	constructor(
		public type: LogType,
		public messageType: LogMessageType,
		public message: string,
		public object: any|undefined,
	) {
		this.start = Date.now();
	}
}
