import {ComponentInterface} from "../interfaces/ComponentInterface";
import {ResponseElementInterface} from "../interfaces/response/ResponseElementInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {AbstractRpgManager} from "./AbstractRpgManager";
import {App} from "obsidian";
import {RecordInterface} from "../interfaces/database/RecordInterface";

export abstract class AbstractComponent extends AbstractRpgManager implements ComponentInterface {
	constructor(
		app: App,
		protected currentElement: RecordInterface,
	) {
		super(app);
	}

	abstract generateData(
		relationships: RelationshipInterface|RelationshipInterface[],
		title: string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseElementInterface | null>;
}
