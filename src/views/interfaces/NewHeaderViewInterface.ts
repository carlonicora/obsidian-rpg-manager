import {ViewInterface} from "../../api/viewsManager/interfaces/ViewInterface";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {NewViewType} from "../../core/enums/NewViewType";

export interface NewHeaderViewInterface extends ViewInterface {
	model: ModelInterface;
	containerEl: HTMLElement;
	sourcePath: string;
}
