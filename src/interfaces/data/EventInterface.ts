import {RecordInterface} from "../database/RecordInterface";

export interface EventInterface extends RecordInterface {
	date: Date|null;
}
