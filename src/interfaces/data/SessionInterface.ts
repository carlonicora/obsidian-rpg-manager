import {RpgDataInterface} from "./RpgDataInterface";
import {AdventureInterface} from "./AdventureInterface";
import {NoteInterface} from "./NoteInterface";

export interface SessionInterface extends RpgDataInterface {
	sessionId: number;
	adventure: AdventureInterface;
	previousSession: SessionInterface|null;
	nextSession: SessionInterface|null;
	note: NoteInterface|null;
	date: Date|null;
	irl: Date|null;
}
