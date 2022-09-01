import {GenericDataInterface} from "./GenericDataInterface";
import {GenericImageDataInterface} from "./GenericImageDataInterface";

export interface LocationDataInterface extends GenericDataInterface, GenericImageDataInterface {
	synopsis: string;
	address: string;
}
