import {App} from "obsidian";
import {NewViewType} from "../../../core/enums/NewViewType";
import {ViewInterface} from "./ViewInterface";
import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";

export interface ViewClassInterface<T> {
	new(
		model: ModelInterface,
		containerEl: HTMLElement,
		sourcePath: string,
	): ViewInterface;
}
