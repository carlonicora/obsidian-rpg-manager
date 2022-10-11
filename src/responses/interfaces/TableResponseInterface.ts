import {ResponseDataElementInterface} from "./ResponseDataElementInterface";
import {ContentInterface} from "../contents/interfaces/ContentInterface";
import {ComponentType} from "../../components/enums/ComponentType";
import {TableResponseElementInterface} from "./TableResponseElementInterface";

export interface TableResponseInterface extends ResponseDataElementInterface {
	class: string|null;
	headers: Array<ContentInterface>;
	content: Array<TableResponseElementInterface>;
	create: ComponentType|undefined;
	campaignId: number|undefined;
	adventureId: number|undefined;
	actId: number|undefined;
	open: boolean;

	addHeaders(
		headers: Array<ContentInterface>,
	): void;

	addContent(
		content: TableResponseElementInterface,
	): void;
}
