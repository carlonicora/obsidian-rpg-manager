import {SubModelInterface} from "../interfaces/SubModelInterface";
import {ResponseDataElementInterface} from "../../../responses/interfaces/ResponseDataElementInterface";
import {AbstractRpgManager} from "../../../core/abstracts/AbstractRpgManager";
import {App} from "obsidian";
import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {RelationshipInterface} from "../../../services/relationships/interfaces/RelationshipInterface";

export abstract class AbstractSubModel extends AbstractRpgManager implements SubModelInterface {
	constructor(
		app: App,
		protected currentComponent: ComponentModelInterface,
	) {
		super(app);
	}

	abstract generateData(
		relationships: RelationshipInterface|RelationshipInterface[],
		title: string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface | null>;
}
