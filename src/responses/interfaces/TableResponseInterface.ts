import {ResponseDataElementInterface} from "./ResponseDataElementInterface";
import {ContentInterface} from "../contents/interfaces/ContentInterface";
import {ComponentType} from "../../databases/enums/ComponentType";

export interface TableResponseInterface extends ResponseDataElementInterface {
	class: string|null;
	headers: Array<ContentInterface>;
	content: Array<Array<ContentInterface>>;
	create: ComponentType|undefined;
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
