import {App} from "obsidian";
import {NewViewType} from "../../../core/enums/NewViewType";
import {NewViewInterface} from "../../../views/interfaces/NewViewInterface";
import {ComponentModelInterface} from "../../componentManager/interfaces/ComponentModelInterface";

export interface NewViewClassInterface<T> {
	new(
		model: ComponentModelInterface,
		containerEl: HTMLElement,
		sourcePath: string,
	): NewViewInterface;
}
