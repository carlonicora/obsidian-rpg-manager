import {AbtStage} from "../../../services/plotsService/enums/AbtStage";

export interface ActDataInterface {
	get abtStage(): AbtStage|undefined;
}
