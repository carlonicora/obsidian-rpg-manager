import {AbtStage} from "../../../services/plotsServices/enums/AbtStage";
import {ComponentDataInterface} from "../../../../REFACTOR/interfaces/ComponentDataInterface";

export interface ActDataInterface extends ComponentDataInterface {
	get abtStage(): AbtStage|undefined;
}
