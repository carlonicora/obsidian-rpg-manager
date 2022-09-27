import {ComponentInterface} from "../database/ComponentInterface";
import {AdventureInterface} from "./AdventureInterface";
import {AbtStage} from "../../enums/AbtStage";

export interface ActInterface extends ComponentInterface {
	actId: number;
	adventure: AdventureInterface;
	previousAct: ActInterface|null;
	nextAct: ActInterface|null;
	abtStage: AbtStage|undefined;
}
