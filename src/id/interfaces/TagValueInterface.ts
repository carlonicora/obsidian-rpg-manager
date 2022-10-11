import {TagStatus} from "../enums/TagStatus";

export interface TagValueInterface {
	status: TagStatus,
	value: number|undefined,
}
