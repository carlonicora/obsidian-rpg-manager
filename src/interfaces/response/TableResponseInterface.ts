import {ResponseElementInterface} from "./ResponseElementInterface";
import {ContentInterface} from "../ContentInterface";
import {RecordType} from "../../enums/RecordType";

export interface TableResponseInterface extends ResponseElementInterface {
	class: string|null;
	headers: Array<ContentInterface>;
	content: Array<Array<ContentInterface>>;
	create: RecordType|undefined;
	campaignId: number|undefined;
	adventureId: number|undefined;
	actId: number|undefined;
	open: boolean;

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
