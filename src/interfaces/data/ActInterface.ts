import {RecordInterface} from "../database/RecordInterface";
import {AdventureInterface} from "./AdventureInterface";

export interface ActInterface extends RecordInterface {
	actId: number;
	adventure: AdventureInterface;
	previousAct: ActInterface|null;
	nextAct: ActInterface|null;
}
