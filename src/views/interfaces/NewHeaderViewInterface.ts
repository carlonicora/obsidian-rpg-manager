import {ViewInterface} from "../../managers/viewsManager/interfaces/ViewInterface";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";

export interface NewHeaderViewInterface extends ViewInterface {
	model: ModelInterface;
	containerEl: HTMLElement;
	sourcePath: string;
}
