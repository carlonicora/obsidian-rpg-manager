import {LoggerFactoryInterface} from "./interfaces/LoggerFactoryInterface";
import {InfoLog} from "../InfoLog";
import {LogMessageType} from "../enums/LogMessageType";
import {WarningLog} from "../WarningLog";
import {ErrorLog} from "../ErrorLog";
import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {App} from "obsidian";

export class LoggerFactory extends AbstractFactory implements LoggerFactoryInterface {
	constructor(
		app: App
	) {
		super(app);
		this.info(LogMessageType.System, 'Logger active');
	}

	public async info(
		type: LogMessageType,
		message: string,
		object: any|undefined=undefined,
	): Promise<void> {
		new InfoLog(this.app, type, message, object).maybeWriteLog();
	}

	public async warning(
		type: LogMessageType,
		message: string,
		object: any|undefined=undefined,
	): Promise<void> {
		new WarningLog(this.app, type, message, object).maybeWriteLog();
	}

	public async error(
		type: LogMessageType,
		message: string,
		object: any|undefined=undefined,
	): Promise<void> {
		new ErrorLog(this.app, type, message, object).maybeWriteLog();
	}
}
