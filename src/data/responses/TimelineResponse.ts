import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {TimelineResponseInterface} from "../../interfaces/response/TimelineResponseInterface";
import {TimelineElementResponseInterface} from "../../interfaces/response/TimelineElementResponseInterface";
import {ResponseType} from "../../enums/ResponseType";

export class TimelineResponse extends AbstractResponse implements TimelineResponseInterface {
	public elements: TimelineElementResponseInterface[];

	constructor(
	) {
		super();
		this.responseType = ResponseType.Timeline;
		this.elements = [];
	}

	sort(){
		this.elements.sort((a: TimelineElementResponseInterface,b: TimelineElementResponseInterface) => {
			return a.fullDate - b.fullDate;
		});
	}
}
