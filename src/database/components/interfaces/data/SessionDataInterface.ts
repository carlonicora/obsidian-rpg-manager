import {AbtStage} from "../../../../enums/AbtStage";

export interface SessionDataInterface {
	get irl(): Date | undefined
	get abtStage(): AbtStage | undefined;
}
