import {RpgManagerApiInterface} from "../../interfaces/RpgManagerApiInterface";

export interface ModelClassInterface<T> {
	new(api: RpgManagerApiInterface): T;
}
