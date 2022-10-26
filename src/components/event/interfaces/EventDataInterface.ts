import {DateInterface} from "../../../../REFACTOR/services/dateService/interfaces/DateInterface";

export interface EventDataInterface {
	get date(): DateInterface | undefined;
}

