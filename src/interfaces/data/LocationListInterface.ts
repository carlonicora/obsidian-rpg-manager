import {LocationDataInterface} from "./LocationDataInterface";
import {GenericDataListInterface} from "./GenericDataListInterface";

export interface LocationListInterface extends GenericDataListInterface {
	elements: LocationDataInterface[];
}
