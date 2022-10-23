import {DateInterface} from "../../../../services/date/interfaces/DateInterface";

export interface EventDataInterface {
	get date(): DateInterface | undefined;
}

