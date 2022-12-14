import {ComponentInterface} from "./ComponentInterface";
import {ClassInterface} from "../../../api/interfaces/ClassInterface";

export interface ComponentsManagerInterface {
	get<T extends ComponentInterface>(
		component: ClassInterface<T>,
	): T;

	register<T extends ComponentInterface>(
		componentClass: ClassInterface<T>,
	): void;
}
