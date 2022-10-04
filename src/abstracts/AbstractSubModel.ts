import {SubModelInterface} from "../models/interfaces/SubModelInterface";
import {ResponseDataElementInterface} from "../responses/interfaces/ResponseDataElementInterface";
import {AbstractRpgManager} from "./AbstractRpgManager";
import {App} from "obsidian";
import {ComponentInterface} from "../databases/interfaces/ComponentInterface";
import {RelationshipInterface} from "../relationships/interfaces/RelationshipInterface";

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
