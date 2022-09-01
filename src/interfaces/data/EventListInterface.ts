import {EventDataInterface} from "./EventDataInterface";
import {GenericDataListInterface} from "./GenericDataListInterface";

export interface EventListInterface extends GenericDataListInterface {
	elements: EventDataInterface[];
}
