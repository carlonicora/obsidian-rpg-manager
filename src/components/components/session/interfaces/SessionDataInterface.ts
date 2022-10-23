import {AbtStage} from "../../../../plots/enums/AbtStage";
import {DateInterface} from "../../../../services/date/interfaces/DateInterface";

export interface SessionDataInterface {
	get irl(): DateInterface | undefined
	get abtStage(): AbtStage | undefined;
	get targetDuration(): number|undefined;
}
