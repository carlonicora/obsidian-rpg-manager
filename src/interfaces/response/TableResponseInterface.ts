import {ResponseElementInterface} from "./ResponseElementInterface";
import {ContentInterface} from "../ContentInterface";
import {DataType} from "../../enums/DataType";

export interface TableResponseInterface extends ResponseElementInterface {
	class: string|null;
	headers: Array<ContentInterface>;
	content: Array<Array<ContentInterface>>;
	create: DataType|undefined;
	campaignId: number|undefined;
	adventureId: number|undefined;
	sessionId: number|undefined;

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
