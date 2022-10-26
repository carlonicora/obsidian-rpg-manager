import {SubModelInterface} from "../interfaces/SubModelInterface";
import {ResponseDataElementInterface} from "../../responses/interfaces/ResponseDataElementInterface";
import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {App} from "obsidian";
import {ModelInterface} from "../../../src/api/modelsManager/interfaces/ModelInterface";
import {RelationshipInterface} from "../../../src/services/relationshipsService/interfaces/RelationshipInterface";

export abstract class AbstractSubModel extends AbstractRpgManager implements SubModelInterface {
	constructor(
		app: App,
		protected currentComponent: ModelInterface,
	) {
		super(app);
	}

	abstract generateData(
		relationships: RelationshipInterface|RelationshipInterface[],
		title: string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface | null>;
}
