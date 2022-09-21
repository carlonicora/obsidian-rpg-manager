import {App} from "obsidian";
import {RelationshipInterface} from "../RelationshipInterface";
import {ResponseElementInterface} from "../response/ResponseElementInterface";
import {ComponentInterface} from "../ComponentInterface";

export interface ComponentFactoryInterface  {
	create<T extends ComponentInterface>(
		componentType: (new (app: App) => T),
		data: RelationshipInterface|RelationshipInterface[],
		title?: string|undefined,
		additionalInformation?: any|undefined,
	): Promise<ResponseElementInterface|null>;
}
