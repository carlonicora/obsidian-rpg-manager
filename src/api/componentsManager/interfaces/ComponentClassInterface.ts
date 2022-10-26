import {RpgManagerApiInterface} from "../../interfaces/RpgManagerApiInterface";

export interface ComponentClassInterface<T> {
	new (api: RpgManagerApiInterface): T;
}
