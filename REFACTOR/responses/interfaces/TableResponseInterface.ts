import {ResponseDataElementInterface} from "./ResponseDataElementInterface";
import {ContentInterface} from "../contents/interfaces/ContentInterface";
import {ComponentType} from "../../../src/core/enums/ComponentType";
import {TableResponseElementInterface} from "./TableResponseElementInterface";

export interface TableResponseInterface extends ResponseDataElementInterface {
	class: string|null;
	headers: ContentInterface[];
	content: TableResponseElementInterface[];
	create: ComponentType|undefined;
	campaignId: number|undefined;
	adventureId: number|undefined;
	actId: number|undefined;
	open: boolean;

	addHeaders(
		headers: ContentInterface[],
	): void;

	addContent(
		content: TableResponseElementInterface,
	): void;
}
