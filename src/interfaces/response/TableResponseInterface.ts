import {ResponseElementInterface} from "./ResponseElementInterface";
import {ContentInterface} from "../content/ContentInterface";

export interface TableResponseInterface extends ResponseElementInterface {
	headers: Array<ContentInterface>;
	content: Array<Array<ContentInterface>>;

	addHeaders(
		headers: Array<ContentInterface>,
	): void;

	addContent(
		content: Array<ContentInterface>,
	): void;

	addContentList(
		content: Array<Array<ContentInterface>>,
	): void;
}
