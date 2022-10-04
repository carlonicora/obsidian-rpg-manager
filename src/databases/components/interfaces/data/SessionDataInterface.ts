import {AbtStage} from "../../../../plots/enums/AbtStage";

export interface SessionDataInterface {
	get irl(): Date | undefined
	get abtStage(): AbtStage | undefined;
}
