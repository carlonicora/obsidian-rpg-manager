import {ComponentInterface} from "../database/ComponentInterface";

export interface SessionInterface extends ComponentInterface {
	sessionId: number;
	previousSession: SessionInterface|null;
	nextSession: SessionInterface|null;
	date: Date|null;
	irl: Date|null;
}
