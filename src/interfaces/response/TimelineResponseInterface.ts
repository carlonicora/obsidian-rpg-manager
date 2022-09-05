import {ResponseElementInterface} from "./ResponseElementInterface";
import {TimelineElementResponseInterface} from "./TimelineElementResponseInterface";

export interface TimelineResponseInterface extends ResponseElementInterface {
	elements: TimelineElementResponseInterface[];
}
