import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";

export interface ElementDataInterface {
	model: ModelInterface,
	title: string,
	values: any,
	editableKey?: string,
}
