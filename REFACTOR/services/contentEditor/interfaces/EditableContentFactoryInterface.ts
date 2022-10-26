import {ModelInterface} from "../../../../src/api/modelsManager/interfaces/ModelInterface";

export interface EditableContentFactoryInterface {
	open(
		component: ModelInterface,
		editableField: string,
	): Promise<boolean>;
}
