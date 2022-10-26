import {App} from "obsidian";
import {RpgManagerApiInterface} from "../../interfaces/RpgManagerApiInterface";

export interface ModelClassInterface<T> {
	new(app: App, api: RpgManagerApiInterface): T;
}
