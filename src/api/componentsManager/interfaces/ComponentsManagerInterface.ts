import {ComponentClassInterface} from "./ComponentClassInterface";
import {ComponentInterface} from "./ComponentInterface";

export interface ComponentsManagerInterface {
	get<T extends ComponentInterface>(
		component: ComponentClassInterface<T>,
	): T;

	register<T extends ComponentInterface>(
		componentClass: ComponentClassInterface<T>,
	): void;
}
