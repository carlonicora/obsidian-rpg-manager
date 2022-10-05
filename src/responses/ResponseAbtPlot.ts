import {AbstractResponse} from "./abstracts/AbstractResponse";
import {AbtPlotResponseInterface} from "./interfaces/AbtPlotResponseInterface";
import {App} from "obsidian";
import {ResponseType} from "./enums/ResponseType";
import {ContentInterface} from "./contents/interfaces/ContentInterface";
import {ComponentInterface} from "../databases/interfaces/ComponentInterface";

export class ResponseAbtPlot extends AbstractResponse implements AbtPlotResponseInterface {
	public need: ContentInterface;
	public and: ContentInterface;
	public but: ContentInterface;
	public therefore: ContentInterface;

	constructor(
		app: App,
		currentElement: ComponentInterface,
	) {
		super(app, currentElement);
		this.responseType = ResponseType.AbtPlot;
	}
}
