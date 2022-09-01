import {GenericDataInterface} from "./GenericDataInterface";
import {GenericImageDataInterface} from "./GenericImageDataInterface";

export interface FactionDataInterface extends GenericDataInterface, GenericImageDataInterface {
	synopsis: string;
}
