import {RpgDataInterface} from "./RpgDataInterface";
import {RpgElementDataInterface} from "./RpgElementDataInterface";

export interface LocationInterface extends RpgDataInterface, RpgElementDataInterface {
	address: string|null;
}
