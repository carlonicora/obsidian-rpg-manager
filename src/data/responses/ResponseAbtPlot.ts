import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {AbtPlotResponseInterface} from "../../interfaces/response/AbtPlotResponseInterface";
import {App} from "obsidian";
import {ResponseType} from "../../enums/ResponseType";
import {ContentInterface} from "../../interfaces/ContentInterface";

export class ResponseAbtPlot extends AbstractResponse implements AbtPlotResponseInterface {
	public need: ContentInterface;
	public and: ContentInterface;
	public but: ContentInterface;
	public therefore: ContentInterface;

	constructor(
		app: App,
	) {
		super(app);
		this.responseType = ResponseType.AbtPlot;
	}
}
