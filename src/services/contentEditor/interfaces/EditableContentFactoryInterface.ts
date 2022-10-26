import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";

export interface EditableContentFactoryInterface {
	open(
		component: ModelInterface,
		editableField: string,
	): Promise<boolean>;
}
