import {ResponseElementInterface} from "./ResponseElementInterface";
import {ContentInterface} from "../ContentInterface";

export interface StringResponseInterface extends ResponseElementInterface {
	content: ContentInterface;

	addContent(
		content: ContentInterface,
	): void;
}
