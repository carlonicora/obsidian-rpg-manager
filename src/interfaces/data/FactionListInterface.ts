import {FactionDataInterface} from "./FactionDataInterface";
import {GenericDataListInterface} from "./GenericDataListInterface";

export interface FactionListInterface extends GenericDataListInterface {
	elements: FactionDataInterface[];
}
