import { App, MarkdownRenderChild, parseYaml } from "obsidian";
import { createElement } from "react";
import { Root, createRoot } from "react-dom/client";
import ElementComponent from "src/components/ElementComponent";
import { ApiContext } from "src/contexts/ApiContext";
import { AppContext } from "src/contexts/AppContext";
import { Element } from "src/interfaces/Element";
import { RPGManager } from "src/interfaces/RPGManager";

export class ElementController extends MarkdownRenderChild {
	private _root: Root | undefined = undefined;
	private _element: Element | undefined = undefined;
	private _sourceData: any;

	constructor(
		private _app: App,
		private _api: RPGManager,
		private _path: string,
		container: HTMLElement,
		private _source: string
	) {
		super(container);

		this._sourceData = parseYaml(this._source);
		this._root = createRoot(this.containerEl);

		this.registerEvent(this._app.workspace.on("rpgmanager:refresh-views", this._render.bind(this)));
	}

	private _render() {
		if (this._element === undefined) this._element = this._api.getByPath(this._path) as Element | undefined;

		if (!this._element || this._root === undefined) return;

		this._path = this._element.path;

		const elementComponent = createElement(ElementComponent, {
			element: this._element,
			key: this._element.version.toString(),
		});
		const reactComponent = createElement(
			AppContext.Provider,
			{ value: this._app },
			createElement(ApiContext.Provider, { value: this._api }, elementComponent)
		);

		this._root.render(reactComponent);
	}

	onload() {
		super.onload();

		this._render();
	}
}
