import {RecordInterface} from "../database/RecordInterface";

export interface ClueInterface extends RecordInterface {
	found: Date|null;

	get isFound(): boolean;
}
