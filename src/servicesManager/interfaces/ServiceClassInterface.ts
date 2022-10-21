import {App} from "obsidian";

export interface ServiceClassInterface<T> {
	new(app: App): T;
}
