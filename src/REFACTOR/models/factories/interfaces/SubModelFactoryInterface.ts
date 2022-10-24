import {App} from "obsidian";
import {ResponseDataElementInterface} from "../../../../responses/interfaces/ResponseDataElementInterface";
import {SubModelInterface} from "../../interfaces/SubModelInterface";
import {ComponentModelInterface} from "../../../../api/componentManager/interfaces/ComponentModelInterface";
import {RelationshipInterface} from "../../../../services/relationships/interfaces/RelationshipInterface";

export interface SubModelFactoryInterface {
	create<T extends SubModelInterface>(
		subModelType: (new (app: App) => T),
		currentComponent: ComponentModelInterface,
		data: RelationshipInterface|RelationshipInterface[],
		title?: string|undefined,
		additionalInformation?: any|undefined,
	): Promise<ResponseDataElementInterface|null>;
}
