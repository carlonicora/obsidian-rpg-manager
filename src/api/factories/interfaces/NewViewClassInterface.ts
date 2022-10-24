import {App} from "obsidian";

export interface NewViewClassInterface<T> {
	new(app: App): T;
}
