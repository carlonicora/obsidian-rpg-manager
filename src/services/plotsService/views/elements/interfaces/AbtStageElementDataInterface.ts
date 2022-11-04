import {ElementDataInterface} from "../../../../../managers/viewsManager/interfaces/ElementDataInterface";
import {AbtStage} from "../../../enums/AbtStage";

export interface AbtStageElementDataInterface extends ElementDataInterface {
	values: AbtStage|undefined;
}
