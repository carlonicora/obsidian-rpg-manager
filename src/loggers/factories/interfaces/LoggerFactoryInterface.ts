import {LogMessageType} from "../../enums/LogMessageType";

export interface LoggerFactoryInterface {
	info(
		type: LogMessageType,
		message: string,
		object?: any,
	): Promise<void>;

	warning(
		type: LogMessageType,
		message: string,
		object?: any,
	): Promise<void>;

	error(
		type: LogMessageType,
		message: string,
		object?: any,
	): Promise<void>;
}
