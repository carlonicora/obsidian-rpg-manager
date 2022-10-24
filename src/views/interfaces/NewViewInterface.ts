import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {NewViewType} from "../../core/enums/NewViewType";

export interface NewViewInterface {
	model: ComponentModelInterface,
	containerEl: HTMLElement,

	render(): void;
	get type(): NewViewType;
}
