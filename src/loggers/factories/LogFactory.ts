import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {LogFactoryInterface} from "../interfaces/LogFactoryInterface";
import {LogWriterInterface} from "../interfaces/LogWriterInterface";
import {App} from "obsidian";
import {ConsoleLogger} from "../loggers/ConsoleLogger";
import {LogMessageType} from "../enums/LogMessageType";
import {LogMessageInterface} from "../interfaces/LogMessageInterface";
import {InfoMessage} from "../messages/InfoMessage";
import {WarningMessage} from "../messages/WarningMessage";
import {ErrorMessage} from "../messages/ErrorMessage";
import {LogGroupInterface} from "../interfaces/LogGroupInterface";
import {LogWriterType} from "../enums/LogWriterType";
import {LogGroup} from "../groups/LogGroup";

export class LogFactory extends AbstractFactory implements LogFactoryInterface {
	private _logWriter: LogWriterInterface;

	constructor(
		app: App,
		type: LogWriterType,
	) {
		super(app);
		this._logWriter = new ConsoleLogger(this.app);
	}

	public createInfo(
		messageType: LogMessageType,
		message: string,
		object?: any|undefined,
	): LogMessageInterface {
		return new InfoMessage(messageType, message, object);
	}

	public async info(
		messageType: LogMessageType,
		message: string,
		object?: any|undefined,
	): Promise<void> {
		this._logWriter.maybeWriteLog(
			this.createInfo(messageType, message, object)
		);
	}

	public createWarning(
		messageType: LogMessageType,
		message: string,
		object?: any|undefined,
	): LogMessageInterface {
		return new WarningMessage(messageType, message, object)
	}

	public async warning(
		messageType: LogMessageType,
		message: string,
		object?: any|undefined,
	): Promise<void> {
		this._logWriter.maybeWriteLog(
			this.createWarning(messageType, message, object)
		);
	}

	public createError(
		messageType: LogMessageType,
		message: string,
		object?: any|undefined,
	): LogMessageInterface {
		return new ErrorMessage(messageType, message, object);
	}

	public async error(
		messageType: LogMessageType,
		message: string,
		object?: any|undefined,
	): Promise<void> {
		this._logWriter.maybeWriteLog(
			this.createError(messageType, message, object)
		);
	}

	public createGroup(
	): LogGroupInterface {
		return new LogGroup();
	}

	public async group(
		group: LogGroupInterface,
	): Promise<void> {
		this._logWriter.maybeWriteLogList(group);
	}
}
