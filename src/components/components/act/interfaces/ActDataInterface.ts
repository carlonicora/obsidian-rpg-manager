import {AbtStage} from "../../../../plots/enums/AbtStage";
import {ComponentDataInterface} from "../../../interfaces/ComponentDataInterface";

export interface ActDataInterface extends ComponentDataInterface {
	get abtStage(): AbtStage|undefined;
}
