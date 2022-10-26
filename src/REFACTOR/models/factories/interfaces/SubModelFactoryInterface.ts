import {App} from "obsidian";
import {ResponseDataElementInterface} from "../../../../responses/interfaces/ResponseDataElementInterface";
import {SubModelInterface} from "../../interfaces/SubModelInterface";
import {ModelInterface} from "../../../../api/modelsManager/interfaces/ModelInterface";
import {RelationshipInterface} from "../../../../services/relationshipsService/interfaces/RelationshipInterface";

export interface SubModelFactoryInterface {
	create<T extends SubModelInterface>(
		subModelType: (new (app: App) => T),
		currentComponent: ModelInterface,
		data: RelationshipInterface|RelationshipInterface[],
		title?: string|undefined,
		additionalInformation?: any|undefined,
	): Promise<ResponseDataElementInterface|null>;
}
