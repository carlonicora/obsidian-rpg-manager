import {App} from "obsidian";

export abstract class AbstractFactory {
	constructor(
		protected app: App,
	) {
	}
}
