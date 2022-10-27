import {AbtStage} from "../../../services/plotsServices/enums/AbtStage";

export interface ActDataInterface {
	get abtStage(): AbtStage|undefined;
}
