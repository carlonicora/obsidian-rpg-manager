import {RpgFunctions} from "../data/RpgFunctions";
import {App} from "obsidian";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";

export interface ViewInterface {
	render(
		data: any,
	): void;
}

export abstract class AbstractView implements ViewInterface {
	protected container: HTMLElement;

	constructor(
		protected functions: RpgFunctions,
		protected app: App,
		protected dv: DataviewInlineApi,
	) {
		this.container = dv.container;
	}

	public abstract render(
		data: any,
	): void;
}
