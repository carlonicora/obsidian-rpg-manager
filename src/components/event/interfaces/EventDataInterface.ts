import {DateInterface} from "../../../services/dateService/interfaces/DateInterface";

export interface EventDataInterface {
	get date(): DateInterface | undefined;
}

