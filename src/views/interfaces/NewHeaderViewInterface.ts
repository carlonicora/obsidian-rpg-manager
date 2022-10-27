import {ViewInterface} from "../../api/viewsManager/interfaces/ViewInterface";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";

export interface NewHeaderViewInterface extends ViewInterface {
	model: ModelInterface;
	containerEl: HTMLElement;
	sourcePath: string;
}
