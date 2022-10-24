import {AbtStage} from "../../../services/plots/enums/AbtStage";
import {ComponentDataInterface} from "../../../core/interfaces/ComponentDataInterface";

export interface ActDataInterface extends ComponentDataInterface {
	get abtStage(): AbtStage|undefined;
}
