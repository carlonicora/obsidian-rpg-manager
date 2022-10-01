import {SubModelInterface} from "../interfaces/SubModelInterface";
import {ResponseDataElementInterface} from "../interfaces/response/ResponseDataElementInterface";
import {AbstractRpgManager} from "./AbstractRpgManager";
import {App} from "obsidian";
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";
import {RelationshipV2Interface} from "../_dbV2/relationships/interfaces/RelationshipV2Interface";

export abstract class AbstractSubModel extends AbstractRpgManager implements SubModelInterface {
	constructor(
		app: App,
		protected currentElement: ComponentV2Interface,
	) {
		super(app);
	}

	abstract generateData(
		relationships: RelationshipV2Interface|RelationshipV2Interface[],
		title: string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface | null>;
}
