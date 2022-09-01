import {GenericDataListInterface} from "./GenericDataListInterface";
import {TimelineDataInterface} from "./TimelineDataInterface";

export interface TimelineListInterface extends GenericDataListInterface {
	elements: TimelineDataInterface[];
}
