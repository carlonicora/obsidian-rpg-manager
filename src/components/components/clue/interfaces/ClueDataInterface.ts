import {DateInterface} from "../../../../services/date/interfaces/DateInterface";

export interface ClueDataInterface {
	get found(): DateInterface | undefined;
}
