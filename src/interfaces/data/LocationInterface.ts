import {RecordInterface} from "../database/RecordInterface";

export interface LocationInterface extends RecordInterface {
	address: string|null;
}
