import {RecordInterface} from "../database/RecordInterface";

export interface SessionInterface extends RecordInterface {
	sessionId: number;
	previousSession: SessionInterface|null;
	nextSession: SessionInterface|null;
	date: Date|null;
	irl: Date|null;
}
