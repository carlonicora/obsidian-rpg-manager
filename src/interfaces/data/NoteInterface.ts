import {RpgDataInterface} from "./RpgDataInterface";
import {AdventureInterface} from "./AdventureInterface";
import {RpgOutlineDataInterface} from "./RpgOutlineDataInterface";

export interface NoteInterface extends RpgDataInterface, RpgOutlineDataInterface {
	adventure: AdventureInterface;
	sessionId: number;
}
