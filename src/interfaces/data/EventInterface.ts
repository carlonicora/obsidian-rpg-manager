import {RpgDataInterface} from "./RpgDataInterface";
import {RpgElementDataInterface} from "./RpgElementDataInterface";

export interface EventInterface extends RpgDataInterface, RpgElementDataInterface {
	date: Date|null;
}
