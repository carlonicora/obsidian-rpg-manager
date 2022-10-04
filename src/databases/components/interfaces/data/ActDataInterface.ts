import {AbtStage} from "../../../../plots/enums/AbtStage";
import {ComponentDataInterface} from "../ComponentDataInterface";

export interface ActDataInterface extends ComponentDataInterface {
	get abtStage(): AbtStage|undefined;
}
