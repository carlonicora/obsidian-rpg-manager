import {AbstractLogMessage} from "./abstracts/AbstractLogMessage";
import {LogMessageInterface} from "./interfaces/LogMessageInterface";
import {LogMessageType} from "./enums/LogMessageType";
import {LogType} from "./enums/LogType";
import {App} from "obsidian";

export class WarningLog extends AbstractLogMessage implements LogMessageInterface{
	constructor(
		app: App,
		mesageType: LogMessageType,
		message='',
		object: any|undefined=undefined,
	) {
		super(app, LogType.Warning, mesageType, message, object);
	}
}
