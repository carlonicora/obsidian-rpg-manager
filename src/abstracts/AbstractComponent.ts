import {ComponentInterface} from "../interfaces/ComponentInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {App} from "obsidian";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export abstract class AbstractComponent implements ComponentInterface {
	constructor(
		protected app: App,
	) {
	}

	abstract generateData(
		relationships: RelationshipInterface|RelationshipInterface[],
		title: string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface | null>;
}
