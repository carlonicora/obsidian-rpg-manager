import {RpgDataInterface} from "./RpgDataInterface";

export interface ClueInterface extends RpgDataInterface {
	found: Date|null;

	get isFound(): boolean;
}
