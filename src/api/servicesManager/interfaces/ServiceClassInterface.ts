import {RpgManagerApiInterface} from "../../interfaces/RpgManagerApiInterface";

export interface ServiceClassInterface<T> {
	new(api: RpgManagerApiInterface): T;
}
