import {ControllerManagerInterface} from "./interfaces/ControllerManagerInterface";
import {App, Component, MarkdownPostProcessorContext, MarkdownRenderChild} from "obsidian";
import {RpgManagerApiInterface} from "../interfaces/RpgManagerApiInterface";
import {Controller} from "./Controller";

export class ControllerManager implements ControllerManagerInterface {
	constructor(
		private _app: App,
		private _api: RpgManagerApiInterface,
	) {
	}

	public create(
		container: HTMLElement,
		source: string,
		component: Component | MarkdownPostProcessorContext,
		sourcePath: string,
	): MarkdownRenderChild {
		return new Controller(this._app, this._api, container, source, component, sourcePath);
	}
}
