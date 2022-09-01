import {ClueDataInterface} from "./ClueDataInterface";
import {GenericDataListInterface} from "./GenericDataListInterface";

export interface ClueListInterface extends GenericDataListInterface {
	elements: ClueDataInterface[];
}
