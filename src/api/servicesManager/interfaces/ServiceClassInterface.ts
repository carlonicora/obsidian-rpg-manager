import {App} from "obsidian";
import {RpgManagerApiInterface} from "../../interfaces/RpgManagerApiInterface";

export interface ServiceClassInterface<T> {
	new(app: App, api: RpgManagerApiInterface): T;
}
