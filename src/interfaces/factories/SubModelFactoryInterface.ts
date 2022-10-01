import {App} from "obsidian";
import {RelationshipInterface} from "../RelationshipInterface";
import {ResponseDataElementInterface} from "../response/ResponseDataElementInterface";
import {SubModelInterface} from "../SubModelInterface";
import {ComponentV2Interface} from "../../_dbV2/interfaces/ComponentV2Interface";

export interface SubModelFactoryInterface {
	create<T extends SubModelInterface>(
		subModelType: (new (app: App) => T),
		currentElement: ComponentV2Interface,
		data: RelationshipInterface|RelationshipInterface[],
		title?: string|undefined,
		additionalInformation?: any|undefined,
	): Promise<ResponseDataElementInterface|null>;
}
