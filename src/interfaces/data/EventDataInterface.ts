import {GenericDataInterface} from "./GenericDataInterface";
import {GenericImageDataInterface} from "./GenericImageDataInterface";

export interface EventDataInterface extends GenericDataInterface, GenericImageDataInterface {
	date: string;
	time: string;
	synopsis: string;
}
