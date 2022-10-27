import {LogMessageType} from "../enums/LogMessageType";
import {LogMessageInterface} from "./LogMessageInterface";
import {LogGroupInterface} from "./LogGroupInterface";

export interface LoggerServiceInterface {
	createInfo(
		messageType: LogMessageType,
		message: string,
		object?: any|undefined,
	): LogMessageInterface;

	info(
		messageType: LogMessageType,
		message: string,
		object?: any|undefined,
	): Promise<void>;

	createWarning(
		messageType: LogMessageType,
		message: string,
		object?: any|undefined,
	): LogMessageInterface;

	warning(
		messageType: LogMessageType,
		message: string,
		object?: any|undefined,
	): Promise<void>;

	createError(
		messageType: LogMessageType,
		message: string,
		object?: any|undefined,
	): LogMessageInterface;

	error(
		messageType: LogMessageType,
		message: string,
		object?: any|undefined,
	): Promise<void>;

	createGroup(
	): LogGroupInterface;

	group(
		group: LogGroupInterface,
	): Promise<void>;
}
