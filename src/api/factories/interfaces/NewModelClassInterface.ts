import {App} from "obsidian";

export interface NewModelClassInterface<T> {
	new(app: App): T;
}
