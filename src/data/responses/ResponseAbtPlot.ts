import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {AbtPlotResponseInterface} from "../../interfaces/response/AbtPlotResponseInterface";
import {App} from "obsidian";
import {ResponseType} from "../../enums/ResponseType";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";

export class ResponseAbtPlot extends AbstractResponse implements AbtPlotResponseInterface {
	public need: ContentInterface;
	public and: ContentInterface;
	public but: ContentInterface;
	public therefore: ContentInterface;

	constructor(
		app: App,
		currentElement: RecordInterface,
	) {
		super(app, currentElement);
		this.responseType = ResponseType.AbtPlot;
	}
}
