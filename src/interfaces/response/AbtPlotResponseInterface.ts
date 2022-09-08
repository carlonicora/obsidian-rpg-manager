import {ResponseElementInterface} from "./ResponseElementInterface";
import {ContentInterface} from "../ContentInterface";

export interface AbtPlotResponseInterface extends ResponseElementInterface {
	need: ContentInterface;
	and: ContentInterface;
	but: ContentInterface;
	therefore: ContentInterface;
}
