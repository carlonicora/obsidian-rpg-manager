import {ServiceClassInterface} from "./ServiceClassInterface";
import {ServiceInterface} from "./ServiceInterface";

export interface ServiceManagerInterface {
	register<T extends ServiceInterface>(
		serviceClass: ServiceClassInterface<T>
	): void;

	get<T extends ServiceInterface>(
		service: ServiceClassInterface<T>
	): T|undefined;
}
