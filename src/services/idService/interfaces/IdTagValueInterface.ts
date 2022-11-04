import {IdTagStatus} from "../enums/IdTagStatus";

export interface IdTagValueInterface {
	status: IdTagStatus,
	value: number|undefined,
}
