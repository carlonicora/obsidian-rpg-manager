import {ComponentClassInterface} from "./ComponentClassInterface";
import {ComponentInterface} from "./ComponentInterface";
import {ComponentModelInterface} from "./ComponentModelInterface";

export interface ComponentManagerInterface {
	get<T extends ComponentInterface>(
		component: ComponentClassInterface<T>,
	): T;

	register<T extends ComponentInterface>(
		componentClass: ComponentClassInterface<T>,
	): void;
}
