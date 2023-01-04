import {ServiceInterface} from "./ServiceInterface";
import {ClassInterface} from "../../../api/interfaces/ClassInterface";

export interface ServiceManagerInterface {
	get<T extends ServiceInterface>(
		service: ClassInterface<T>
	): T|undefined;

	register<T extends ServiceInterface>(
		serviceClass: ClassInterface<T>
	): void;

	deregister<T extends ServiceInterface>(
		serviceClass: ClassInterface<T>
	): void;

	destroy(): Promise<void>;
}
