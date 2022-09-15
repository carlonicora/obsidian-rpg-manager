import {RecordInterface} from "../database/RecordInterface";
import {AdventureInterface} from "./AdventureInterface";
import {NoteInterface} from "./NoteInterface";

export interface SessionInterface extends RecordInterface {
	sessionId: number;
	adventure: AdventureInterface;
	previousSession: SessionInterface|null;
	nextSession: SessionInterface|null;
	note: NoteInterface|null;
	date: Date|null;
	irl: Date|null;
}
