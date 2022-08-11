import {RpgFunctions} from "../data/functions/RpgFunctions";
import {App} from "obsidian";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {GenericDataListInterface} from "../interfaces/DataInterfaces";

export interface ListViewInterface {
	render(
		data: GenericDataListInterface,
	): void;
}

export abstract class AbstractListView implements ListViewInterface {
	protected container: HTMLElement;

	constructor(
		protected functions: RpgFunctions,
		protected app: App,
		protected dv: DataviewInlineApi,
	) {
		this.container = dv.container;
	}

	public abstract render(
		data: GenericDataListInterface,
	): void;

	spacer() {
		this.dv.span('<div style="height: 20px"></div>');
	}
}
