import {SubModelInterface} from "../interfaces/SubModelInterface";
import {ResponseDataElementInterface} from "../interfaces/response/ResponseDataElementInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {AbstractRpgManager} from "./AbstractRpgManager";
import {App} from "obsidian";
import {ComponentInterface} from "../interfaces/database/ComponentInterface";

export abstract class AbstractSubModel extends AbstractRpgManager implements SubModelInterface {
	constructor(
		app: App,
		protected currentElement: ComponentInterface,
	) {
		super(app);
	}

	abstract generateData(
		relationships: RelationshipInterface|RelationshipInterface[],
		title: string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface | null>;
}
