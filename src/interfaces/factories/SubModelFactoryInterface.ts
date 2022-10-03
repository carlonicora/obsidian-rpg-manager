import {App} from "obsidian";
import {ResponseDataElementInterface} from "../response/ResponseDataElementInterface";
import {SubModelInterface} from "../SubModelInterface";
import {ComponentInterface} from "../../database/interfaces/ComponentInterface";
import {RelationshipInterface} from "../../database/relationships/interfaces/RelationshipInterface";

export interface SubModelFactoryInterface {
	create<T extends SubModelInterface>(
		subModelType: (new (app: App) => T),
		currentElement: ComponentInterface,
		data: RelationshipInterface|RelationshipInterface[],
		title?: string|undefined,
		additionalInformation?: any|undefined,
	): Promise<ResponseDataElementInterface|null>;
}
