import {DateInterface} from "../../../../REFACTOR/services/dateService/interfaces/DateInterface";

export interface ClueDataInterface {
	get found(): DateInterface | undefined;
}
