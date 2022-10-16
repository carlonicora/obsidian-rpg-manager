import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {LogWriterInterface} from "../interfaces/LogWriterInterface";
import {LogType} from "../enums/LogType";
import {App} from "obsidian";
import {LogMessageInterface} from "../interfaces/LogMessageInterface";
import {LogMessageType} from "../enums/LogMessageType";
import {LogGroupInterface} from "../interfaces/LogGroupInterface";

export class ConsoleLogger extends AbstractRpgManager implements LogWriterInterface {
	private _isDebug:boolean;
	private _debuggableTypes: LogType = LogType.Warning | LogType.Error;

	constructor(
		app: App,
	) {
		super(app);
		this._isDebug = (this.pluginVersion.indexOf('-') !== -1);
	}

	async maybeWriteLog(
		log: LogMessageInterface,
		duration: number|undefined=undefined,
	): Promise<void> {
		if (this._isDebug || (log.type & this._debuggableTypes) === log.type) {

			let messageContent = log.message;
			let messageHeader: string | undefined;
			if (messageContent.startsWith('\x1b')) {
				messageHeader = messageContent.substring(0, messageContent.indexOf('\x1b[0m') + 6) + '\n';
				messageContent = messageContent.substring(messageContent.indexOf('\x1b[0m') + 6);
			}
			const data = [
				messageContent + '\n'
			];
			if (log.object !== undefined) data.push(log.object);

			switch (log.type) {
				case LogType.Info:
					if (messageHeader !== undefined) {
						console.info('\x1b[38;2;102;178;155mRPG Manager: ' + LogMessageType[log.messageType] + '\x1b[0m\n' + messageHeader, ...data);
					} else {
						console.info('\x1b[38;2;102;178;155mRPG Manager: ' + LogMessageType[log.messageType] + '\x1b[0m\n', ...data);
					}
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

	async maybeWriteLogList(
		group: LogGroupInterface,
	): Promise<void> {
		let maxLogType: LogType = LogType.Info;
		if (group.logs.length > 0) {
			const messageContent: any[] = [];

			const messageType = group.logs[0].messageType;
			const totalDuration = Date.now() - group.start;

			for (let index = 0; index < group.logs.length; index++) {
				if (index === 0) {
					group.logs[0].duration = group.logs[index].start - group.start;
				} else {
					group.logs[index].duration = group.logs[index].start - group.logs[index - 1].start;
				}

				messageContent.push(group.logs[index].message + ' in ' + group.logs[index].duration + 'ms\n');
				if (group.logs[index].object !== undefined) messageContent.push(group.logs[index].object);

				if (group.logs[index].type > maxLogType) maxLogType = group.logs[index].type;
			}

			switch (maxLogType) {
				case LogType.Info:
						console.info('\x1b[38;2;102;178;155mRPG Manager: ' + LogMessageType[messageType] + ' (' + totalDuration/1000 + 's)\x1b[0m\n', ...messageContent);
					break;
				case LogType.Error:
					console.error(...messageContent);
					break;
				default:
					console.warn(...messageContent);
					break;
			}
		}
	}
}
