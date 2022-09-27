import {ComponentInterface} from "../database/ComponentInterface";

export interface ClueInterface extends ComponentInterface {
	found: Date|null;

	get isFound(): boolean;
}
