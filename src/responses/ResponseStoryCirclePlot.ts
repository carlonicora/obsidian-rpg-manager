import {AbstractResponse} from "../abstracts/AbstractResponse";
import {App} from "obsidian";
import {ResponseType} from "../enums/ResponseType";
import {ContentInterface} from "../interfaces/ContentInterface";
import {StoryCirclePlotResponseInterface} from "../interfaces/response/subModels/StoryCirclePlotResponseInterface";
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";

export class ResponseStoryCirclePlot extends AbstractResponse implements StoryCirclePlotResponseInterface {
	public you: ContentInterface;
	public need: ContentInterface;
	public go: ContentInterface;
	public search: ContentInterface;
	public find: ContentInterface;
	public take: ContentInterface;
	public return: ContentInterface;
	public change: ContentInterface;

	constructor(
		app: App,
		currentElement: ComponentV2Interface,
	) {
		super(app, currentElement);
		this.responseType = ResponseType.StoryCirclePlot;
	}
}
