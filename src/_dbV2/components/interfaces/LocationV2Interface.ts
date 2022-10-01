import {ComponentV2Interface} from "../../interfaces/ComponentV2Interface";

export interface LocationV2Interface extends ComponentV2Interface {
	get address(): string | undefined;
}
