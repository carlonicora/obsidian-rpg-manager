import {ComponentV2Interface} from "../../interfaces/ComponentV2Interface";

export interface ClueV2Interface extends ComponentV2Interface {
	get found(): Date | undefined;
}
