import {App} from "obsidian";
import {RelationshipInterface} from "../RelationshipInterface";
import {ResponseDataElementInterface} from "../response/ResponseDataElementInterface";
import {SubModelInterface} from "../SubModelInterface";
import {ComponentInterface} from "../database/ComponentInterface";

export interface SubModelFactoryInterface {
	create<T extends SubModelInterface>(
		subModelType: (new (app: App) => T),
		currentElement: ComponentInterface,
		data: RelationshipInterface|RelationshipInterface[],
		title?: string|undefined,
		additionalInformation?: any|undefined,
	): Promise<ResponseDataElementInterface|null>;
}
