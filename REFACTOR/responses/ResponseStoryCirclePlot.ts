import {AbstractResponse} from "./abstracts/AbstractResponse";
import {App} from "obsidian";
import {ResponseType} from "./enums/ResponseType";
import {ContentInterface} from "./contents/interfaces/ContentInterface";
import {StoryCirclePlotResponseInterface} from "./interfaces/StoryCirclePlotResponseInterface";
import {ModelInterface} from "../../src/api/modelsManager/interfaces/ModelInterface";

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
		currentComponent: ModelInterface,
	) {
		super(app, currentComponent);
		this.responseType = ResponseType.StoryCirclePlot;
	}
}
