import {ServiceInterface} from "./ServiceInterface";
import {ClassInterface} from "../../../api/interfaces/ClassInterface";

export interface ServiceManagerInterface {
	register<T extends ServiceInterface>(
		serviceClass: ClassInterface<T>
	): void;

	get<T extends ServiceInterface>(
		service: ClassInterface<T>
	): T|undefined;
}
