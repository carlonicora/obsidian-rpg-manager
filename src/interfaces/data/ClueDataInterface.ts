import {GenericDataInterface} from "./GenericDataInterface";
import {GenericImageDataInterface} from "./GenericImageDataInterface";

export interface ClueDataInterface extends GenericDataInterface, GenericImageDataInterface {
	found: string|boolean;
	synopsis: string;
}
