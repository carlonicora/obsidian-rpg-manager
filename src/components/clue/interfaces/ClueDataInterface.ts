import {DateInterface} from "../../../services/dateService/interfaces/DateInterface";

export interface ClueDataInterface {
	get found(): DateInterface | undefined;
}
