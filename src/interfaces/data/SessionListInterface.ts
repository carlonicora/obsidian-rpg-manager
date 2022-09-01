import {SessionDataInterface} from "./SessionDataInterface";
import {GenericDataListInterface} from "./GenericDataListInterface";

export interface SessionListInterface extends GenericDataListInterface {
	elements: SessionDataInterface[];
}
