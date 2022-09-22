import {RecordInterface} from "../database/RecordInterface";
import {AdventureInterface} from "./AdventureInterface";
import {NoteInterface} from "./NoteInterface";

export interface ActInterface extends RecordInterface {
	actId: number;
	adventure: AdventureInterface;
	previousAct: ActInterface|null;
	nextAct: ActInterface|null;
	note: NoteInterface|null;
	date: Date|null;
	irl: Date|null;
}
