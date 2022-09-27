import {ComponentInterface} from "../database/ComponentInterface";

export interface EventInterface extends ComponentInterface {
	date: Date|null;
}
