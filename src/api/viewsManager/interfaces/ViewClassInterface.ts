import {ViewInterface} from "./ViewInterface";
import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {RpgManagerApiInterface} from "../../interfaces/RpgManagerApiInterface";

export interface ViewClassInterface {
	new(
		api: RpgManagerApiInterface,
		model: ModelInterface,
		containerEl: HTMLElement,
		sourcePath: string,
	): ViewInterface;
}
