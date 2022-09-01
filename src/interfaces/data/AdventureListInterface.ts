import {AdventureDataInterface} from "./AdventureDataInterface";
import {GenericDataListInterface} from "./GenericDataListInterface";

export interface AdventureListInterface extends GenericDataListInterface {
	elements: AdventureDataInterface[];
}
