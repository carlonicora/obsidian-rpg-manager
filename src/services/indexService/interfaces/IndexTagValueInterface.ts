import {IndexTagStatus} from "../enums/IndexTagStatus";

export interface IndexTagValueInterface {
	status: IndexTagStatus,
	value: number|undefined,
}
