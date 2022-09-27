import {TimelineElementResponseInterface} from "../interfaces/response/subModels/TimelineElementResponseInterface";

export class ResponseTimelineElement implements TimelineElementResponseInterface {
	constructor(
		public fullDate: Date,
		public date: string,
		public time: string,
		public type: string,
		public synopsis: string,
		public link: string,
	) {
	}
}
