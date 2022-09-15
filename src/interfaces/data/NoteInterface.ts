import {RpgDataInterface} from "./RpgDataInterface";
import {AdventureInterface} from "./AdventureInterface";

export interface NoteInterface extends RpgDataInterface {
	adventure: AdventureInterface;
	sessionId: number;
}
