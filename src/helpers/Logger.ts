import {App} from "obsidian";

export enum LogType {
	Database=0b1,
	DatabaseInitialisation=0b10,
}
export interface LogMessage {
	type: LogType,
	message: string,
	object?: any|undefined,
}

export class Logger {
	private static isDebug:boolean = false;
	private static debuggableTypes: number = LogType.Database & LogType.DatabaseInitialisation;

	public static initialise(
		version: string,
	): void {
		console.log(version);
		if (version.indexOf('-') !== -1) this.isDebug = true;
	}

	public static log(
		message: LogMessage,
	): void {
		if (!this.isDebug) return;
		if ((message.type & this.debuggableTypes) !== message.type) return;

		console.log(
			LogType[message.type],
			message.message,
			message?.object ?? '',
		);
	}
}
