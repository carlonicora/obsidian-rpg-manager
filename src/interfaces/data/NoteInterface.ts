import {RpgDataInterface} from "./RpgDataInterface";
import {RpgElementDataInterface} from "./RpgElementDataInterface";

export interface NoteInterface extends RpgDataInterface, RpgElementDataInterface {
	address: string|null;
}
