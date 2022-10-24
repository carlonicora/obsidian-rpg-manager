import {AbstractResponse} from "./abstracts/AbstractResponse";
import {AbtPlotResponseInterface} from "./interfaces/AbtPlotResponseInterface";
import {App} from "obsidian";
import {ResponseType} from "./enums/ResponseType";
import {ContentInterface} from "./contents/interfaces/ContentInterface";
import {ComponentModelInterface} from "../api/componentManager/interfaces/ComponentModelInterface";

export class ResponseAbtPlot extends AbstractResponse implements AbtPlotResponseInterface {
	public need: ContentInterface;
	public and: ContentInterface;
	public but: ContentInterface;
	public therefore: ContentInterface;

	constructor(
		app: App,
		currentComponent: ComponentModelInterface,
	) {
		super(app, currentComponent);
		this.responseType = ResponseType.AbtPlot;
	}
}
