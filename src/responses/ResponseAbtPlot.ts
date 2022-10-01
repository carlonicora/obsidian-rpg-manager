import {AbstractResponse} from "../abstracts/AbstractResponse";
import {AbtPlotResponseInterface} from "../interfaces/response/subModels/AbtPlotResponseInterface";
import {App} from "obsidian";
import {ResponseType} from "../enums/ResponseType";
import {ContentInterface} from "../interfaces/ContentInterface";
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";

export class ResponseAbtPlot extends AbstractResponse implements AbtPlotResponseInterface {
	public need: ContentInterface;
	public and: ContentInterface;
	public but: ContentInterface;
	public therefore: ContentInterface;

	constructor(
		app: App,
		currentElement: ComponentV2Interface,
	) {
		super(app, currentElement);
		this.responseType = ResponseType.AbtPlot;
	}
}
