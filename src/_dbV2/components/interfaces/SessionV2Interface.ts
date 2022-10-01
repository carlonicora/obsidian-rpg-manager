import {ComponentV2Interface} from "../../interfaces/ComponentV2Interface";
import {AbtStage} from "../../../enums/AbtStage";

export interface SessionV2Interface extends ComponentV2Interface {
	get previousSession(): SessionV2Interface | null;
	get nextSession(): SessionV2Interface | null;
	get irl(): Date | undefined;
	get abtStage(): AbtStage | undefined;
}
