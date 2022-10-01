import {App} from "obsidian";
import {ResponseDataElementInterface} from "../response/ResponseDataElementInterface";
import {SubModelInterface} from "../SubModelInterface";
import {ComponentV2Interface} from "../../_dbV2/interfaces/ComponentV2Interface";
import {RelationshipV2Interface} from "../../_dbV2/relationships/interfaces/RelationshipV2Interface";

export interface SubModelFactoryInterface {
	create<T extends SubModelInterface>(
		subModelType: (new (app: App) => T),
		currentElement: ComponentV2Interface,
		data: RelationshipV2Interface|RelationshipV2Interface[],
		title?: string|undefined,
		additionalInformation?: any|undefined,
	): Promise<ResponseDataElementInterface|null>;
}
