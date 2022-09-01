import {ResponseElementInterface} from "./ResponseElementInterface";
import {ContentInterface} from "../content/ContentInterface";

export interface StringResponseInterface extends ResponseElementInterface {
	content: ContentInterface;

	addContent(
		content: ContentInterface,
	): void;
}
