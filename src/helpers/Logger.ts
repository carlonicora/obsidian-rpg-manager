export enum LogType {
	Info=0b1,
	Warning=0b10,
	Error=0b100,
}

export enum LogMessageType {
	System=0b1,
	Database=0b10,
	DatabaseInitialisation=0b100,
}
export interface LogMessageInterface {
	type: LogType,
	messageType: LogMessageType,
	message: string,
	object?: any|undefined,
}

export abstract class AbstractLogMessage implements LogMessageInterface{
	constructor(
		public type: LogType,
		public messageType: LogMessageType,
		public message: string='',
		public object: any|undefined=undefined,
	) {
		Logger.log(this);
	}
}

export class InfoLog extends AbstractLogMessage implements LogMessageInterface{
	constructor(
		mesageType: LogMessageType,
		message='',
		object: any|undefined=undefined,
	) {
		super(LogType.Info,mesageType,message,object);
	}
}

export class WarningLog extends AbstractLogMessage implements LogMessageInterface{
	constructor(
		mesageType: LogMessageType,
		message='',
		object: any|undefined=undefined,
	) {
		super(LogType.Warning,mesageType,message,object);
	}
}

export class ErrorLog extends AbstractLogMessage implements LogMessageInterface{
	constructor(
		mesageType: LogMessageType,
		message='',
		object: any|undefined=undefined,
	) {
		super(LogType.Error,mesageType,message,object);
	}
}

export class Logger {
	private static isDebug:boolean;
	private static debuggableMessageTypes: number;
	private static debuggableTypes: number;

	public static initialise(
		version: string,
		debuggableTypes: number|undefined=undefined,
	): void {
		if (version.indexOf('-') !== -1) {
			this.isDebug = true;
			this.debuggableMessageTypes = LogMessageType.System && LogMessageType.Database && LogMessageType.DatabaseInitialisation;
			if (debuggableTypes === undefined){
				this.debuggableTypes = LogType.Info | LogType.Warning | LogType.Error;
			} else {
				this.debuggableTypes = debuggableTypes;
			}
			new InfoLog(LogMessageType.System, 'Logger active');
		} else {
			this.isDebug = false;
		}
	}

	public static log(
		message: LogMessageInterface,
	): void {
		if (!this.isDebug) return;
		if ((message.type & this.debuggableTypes) !== message.type) return;

		const data = [message.message + '\n'];
		if(message.object !== undefined) data.push(message.object);

		switch(message.type){
			case LogType.Info:
				console.info(...data);
				break;
			case LogType.Error:
				console.error(...data);
				break;
			default:
				console.warn(...data);
				break;
		}
	}
}
