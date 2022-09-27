import {ComponentInterface} from "../database/ComponentInterface";
import {AbtStage} from "../../enums/AbtStage";

export interface SessionInterface extends ComponentInterface {
	sessionId: number;
	previousSession: SessionInterface|null;
	nextSession: SessionInterface|null;
	date: Date|null;
	irl: Date|null;
	abtStage: AbtStage|undefined;
}
