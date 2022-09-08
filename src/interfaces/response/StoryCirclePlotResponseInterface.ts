import {ResponseElementInterface} from "./ResponseElementInterface";
import {ContentInterface} from "../ContentInterface";

export interface StoryCirclePlotResponseInterface extends ResponseElementInterface {
	you: ContentInterface;
	need: ContentInterface;
	go: ContentInterface;
	search: ContentInterface;
	find: ContentInterface;
	take: ContentInterface;
	return: ContentInterface;
	change: ContentInterface;
}
