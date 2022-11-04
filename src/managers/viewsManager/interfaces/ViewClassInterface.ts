import {StaticViewInterface} from "../../staticViewsManager/interfaces/StaticViewInterface";
import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export interface ViewClassInterface {
	new(
		api: RpgManagerApiInterface,
		model: ModelInterface,
		containerEl: HTMLElement,
		sourcePath: string,
	): StaticViewInterface;
}
