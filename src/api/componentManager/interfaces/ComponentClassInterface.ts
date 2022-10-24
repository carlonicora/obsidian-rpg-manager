import {App} from "obsidian";

export interface ComponentClassInterface<T> {
	new (app: App): T;
}
