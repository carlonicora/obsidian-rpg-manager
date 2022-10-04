import {LogMessageInterface} from "../interfaces/LogMessageInterface";
import {LogType} from "../enums/LogType";
import {LogMessageType} from "../enums/LogMessageType";
import {App} from "obsidian";
import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";

export abstract class AbstractLogMessage extends AbstractRpgManager implements LogMessageInterface{
	private isDebug:boolean;
	private debuggableTypes: LogType = LogType.Warning | LogType.Error;

	constructor(
		public app: App,
		public type: LogType,
		public messageType: LogMessageType,
		public message: string='',
		public object: any|undefined=undefined,
	) {
		super(app);

		this.isDebug = (this.pluginVersion.indexOf('-') !== -1);
	}

	public async maybeWriteLog(
	): Promise<void> {
		if (this.isDebug || (this.type & this.debuggableTypes) === this.type) {

			let messageContent = this.message;
			let messageHeader: string | undefined;
			if (messageContent.startsWith('\x1b')) {
				messageHeader = messageContent.substring(0, messageContent.indexOf('\x1b[0m') + 6) + '\n';
				messageContent = messageContent.substring(messageContent.indexOf('\x1b[0m') + 6);
			}
			const data = [
				messageContent + '\n'
			];
			if (this.object !== undefined) data.push(this.object);

			switch (this.type) {
				case LogType.Info:
					if (messageHeader !== undefined) {
						console.info('\x1b[38;2;102;178;155m' + LogMessageType[this.messageType] + '\x1b[0m\n' + messageHeader, ...data);
					} else {
						console.info('\x1b[38;2;102;178;155m' + LogMessageType[this.messageType] + '\x1b[0m\n', ...data);
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
}
