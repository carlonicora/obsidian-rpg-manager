import {LoggerServiceInterface} from "./interfaces/LoggerServiceInterface";
import {LogWriterInterface} from "./interfaces/LogWriterInterface";
import {ConsoleLogger} from "./loggers/ConsoleLogger";
import {LogMessageType} from "./enums/LogMessageType";
import {LogMessageInterface} from "./interfaces/LogMessageInterface";
import {InfoMessage} from "./messages/InfoMessage";
import {WarningMessage} from "./messages/WarningMessage";
import {ErrorMessage} from "./messages/ErrorMessage";
import {LogGroupInterface} from "./interfaces/LogGroupInterface";
import {LogGroup} from "./groups/LogGroup";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export class LoggerService extends AbstractService implements LoggerServiceInterface, ServiceInterface {
	private _logWriter: LogWriterInterface;

	constructor(
		api: RpgManagerApiInterface,
	) {
		super(api);
		this._logWriter = new ConsoleLogger(this.api);
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
		return new WarningMessage(messageType, message, object);
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
