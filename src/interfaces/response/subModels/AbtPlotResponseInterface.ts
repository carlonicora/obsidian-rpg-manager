import {ResponseDataElementInterface} from "../ResponseDataElementInterface";
import {ContentInterface} from "../../ContentInterface";

export interface AbtPlotResponseInterface extends ResponseDataElementInterface {
	need: ContentInterface;
	and: ContentInterface;
	but: ContentInterface;
	therefore: ContentInterface;
}
