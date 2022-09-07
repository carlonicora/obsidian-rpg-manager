import {RpgDataInterface} from "./RpgDataInterface";
import {RpgOutlineDataInterface} from "./RpgOutlineDataInterface";
import {AdventureInterface} from "./AdventureInterface";

export interface SessionInterface extends RpgDataInterface,RpgOutlineDataInterface {
	sessionId: number;
	adventure: AdventureInterface;
	previousSession: SessionInterface|null;
	nextSession: SessionInterface|null;
	date: Date|null;
	irl: Date|null;
}
