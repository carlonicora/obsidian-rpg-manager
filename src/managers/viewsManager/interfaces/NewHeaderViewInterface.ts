import {StaticViewInterface} from "../../staticViewsManager/interfaces/StaticViewInterface";
import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";

export interface NewHeaderViewInterface extends StaticViewInterface {
	model: ModelInterface;
	containerEl: HTMLElement;
	sourcePath: string;
}
