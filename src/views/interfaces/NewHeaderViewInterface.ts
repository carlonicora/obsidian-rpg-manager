import {NewViewInterface} from "./NewViewInterface";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {NewViewType} from "../../core/enums/NewViewType";

export interface NewHeaderViewInterface extends NewViewInterface {
	model: ComponentModelInterface;
	containerEl: HTMLElement;
	sourcePath: string;
}
