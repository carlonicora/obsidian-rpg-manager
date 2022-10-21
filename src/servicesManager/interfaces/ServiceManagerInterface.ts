import {ServiceClassInterface} from "./ServiceClassInterface";

export interface ServiceManagerInterface {
	register<T>(
		service: ServiceClassInterface<T>
	): void;

	get<T>(
		service: ServiceClassInterface<T>
	): T|undefined;
}
