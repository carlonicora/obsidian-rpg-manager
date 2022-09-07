import {RpgDataInterface} from "./RpgDataInterface";
import {RpgElementDataInterface} from "./RpgElementDataInterface";

export interface ClueInterface extends RpgDataInterface, RpgElementDataInterface {
	found: Date|null;

	get isFound(): boolean;
}
