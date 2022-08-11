import {RpgFunctions} from "../functions/RpgFunctions";
import {App} from "obsidian";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {GenericDataInterface} from "../interfaces/DataInterfaces";

export interface SingleViewInterface {
	render(
		data: GenericDataInterface,
	): void;
}

export abstract class AbstractSingleView implements SingleViewInterface {
	protected container: HTMLElement;

	constructor(
		protected functions: RpgFunctions,
		protected app: App,
		protected dv: DataviewInlineApi,
	) {
		this.container = dv.container;
	}

	public abstract render(
		data: GenericDataInterface,
	): void;

	spacer() {
		this.dv.span('<div style="height: 20px"></div>');
	}
}
