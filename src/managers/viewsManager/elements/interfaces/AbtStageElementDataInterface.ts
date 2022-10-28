import {ElementDataInterface} from "../../interfaces/ElementDataInterface";
import {AbtStage} from "../../../../services/plotsServices/enums/AbtStage";

export interface AbtStageElementDataInterface extends ElementDataInterface {
	values: AbtStage|undefined;
}
