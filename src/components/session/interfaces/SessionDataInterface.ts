import {AbtStage} from "../../../services/plotsService/enums/AbtStage";
import {DateInterface} from "../../../services/dateService/interfaces/DateInterface";

export interface SessionDataInterface {
	get irl(): DateInterface | undefined
	get abtStage(): AbtStage | undefined;
	get targetDuration(): number|undefined;
}
