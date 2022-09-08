import {AbstractResponse} from "../../abstracts/AbstractResponse";
import {App} from "obsidian";
import {ResponseType} from "../../enums/ResponseType";
import {ContentInterface} from "../../interfaces/ContentInterface";
import {StoryCirclePlotResponseInterface} from "../../interfaces/response/StoryCirclePlotResponseInterface";

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
	) {
		super(app);
		this.responseType = ResponseType.StoryCirclePlot;
	}
}
