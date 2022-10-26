import {ResponseDataElementInterface} from "./ResponseDataElementInterface";
import {ContentInterface} from "../contents/interfaces/ContentInterface";

export interface AbtPlotResponseInterface extends ResponseDataElementInterface {
	need: ContentInterface;
	and: ContentInterface;
	but: ContentInterface;
	therefore: ContentInterface;
}
