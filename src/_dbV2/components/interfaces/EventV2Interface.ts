import {ComponentV2Interface} from "../../interfaces/ComponentV2Interface";

export interface EventV2Interface extends ComponentV2Interface {
	get date(): Date | undefined;
}
