import {AbtStage} from "../../../services/plotsServices/enums/AbtStage";
import {DateInterface} from "../../../../REFACTOR/services/dateService/interfaces/DateInterface";

export interface SessionDataInterface {
	get irl(): DateInterface | undefined
	get abtStage(): AbtStage | undefined;
	get targetDuration(): number|undefined;
}
