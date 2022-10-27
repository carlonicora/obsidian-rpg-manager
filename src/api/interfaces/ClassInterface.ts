import {RpgManagerApiInterface} from "./RpgManagerApiInterface";

export interface ClassInterface<T> {
	new(Api: RpgManagerApiInterface): T;
}
