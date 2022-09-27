import {ResponseDataElementInterface} from "../ResponseDataElementInterface";
import {ContentInterface} from "../../ContentInterface";

export interface StoryCirclePlotResponseInterface extends ResponseDataElementInterface {
	you: ContentInterface;
	need: ContentInterface;
	go: ContentInterface;
	search: ContentInterface;
	find: ContentInterface;
	take: ContentInterface;
	return: ContentInterface;
	change: ContentInterface;
}
