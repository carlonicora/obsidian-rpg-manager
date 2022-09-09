import {RpgDataInterface} from "./RpgDataInterface";
import {AdventureInterface} from "./AdventureInterface";
import {SessionInterface} from "./SessionInterface";
import {RpgOutlineDataInterface} from "./RpgOutlineDataInterface";

export interface NoteInterface extends RpgDataInterface, RpgOutlineDataInterface {
	adventure: AdventureInterface;
	session: SessionInterface;
}
