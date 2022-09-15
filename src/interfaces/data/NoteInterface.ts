import {RecordInterface} from "../database/RecordInterface";
import {AdventureInterface} from "./AdventureInterface";

export interface NoteInterface extends RecordInterface {
	adventure: AdventureInterface;
	sessionId: number;
}
