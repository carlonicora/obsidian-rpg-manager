import {App} from "obsidian";
import {ResponseDataElementInterface} from "../../../responses/interfaces/ResponseDataElementInterface";
import {SubModelInterface} from "../../interfaces/SubModelInterface";
import {ComponentInterface} from "../../../components/interfaces/ComponentInterface";
import {RelationshipInterface} from "../../../relationships/interfaces/RelationshipInterface";

export interface SubModelFactoryInterface {
	create<T extends SubModelInterface>(
		subModelType: (new (app: App) => T),
		currentComponent: ComponentInterface,
		data: RelationshipInterface|RelationshipInterface[],
		title?: string|undefined,
		additionalInformation?: any|undefined,
	): Promise<ResponseDataElementInterface|null>;
}
