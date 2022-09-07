import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {TimelineResponseInterface} from "../../interfaces/response/TimelineResponseInterface";
import {TimelineElementResponseInterface} from "../../interfaces/response/TimelineElementResponseInterface";
import {ResponseType} from "../../enums/ResponseType";
import {App} from "obsidian";

export class TimelineResponse extends AbstractResponse implements TimelineResponseInterface {
	public elements: TimelineElementResponseInterface[];

	constructor(
		app: App,
	) {
		super(app);
		this.responseType = ResponseType.Timeline;
		this.elements = [];
	}

	sort(){
		this.elements.sort((a: TimelineElementResponseInterface,b: TimelineElementResponseInterface) => {
			return a.fullDate.valueOf() - b.fullDate.valueOf();
		});
	}
}
