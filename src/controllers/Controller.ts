import { MarkdownRenderChild, parseYaml } from "obsidian";
import React, { createElement } from "react";
import { Root, createRoot } from "react-dom/client";
import { ApiContext } from "src/contexts/ApiContext";
import { RpgManagerInterface } from "../RpgManagerInterface";
import { agnosticComponents } from "../components/system/agnostic";
import { ElementType } from "../data/enums/ElementType";
import { SystemType } from "../data/enums/SystemType";
import { ElementInterface } from "../data/interfaces/ElementInterface";

type ElementProps = { element: ElementInterface; isInPopover: boolean };

export class Controller extends MarkdownRenderChild {
	private _components: Map<SystemType, Map<ElementType, React.FC>> = new Map<SystemType, Map<ElementType, React.FC>>([
		[SystemType.Agnostic, agnosticComponents],
	]);

	private _root: Root | undefined = undefined;
	private _source: any = {};
	private _element: ElementInterface | undefined = undefined;

	constructor(
		private _api: RpgManagerInterface | undefined,
		private _path: string,
		container: HTMLElement,
		source: string
	) {
		super(container);

		this._source = parseYaml(source);
		this._root = createRoot(this.containerEl);

		this.registerEvent(app.workspace.on("rpgmanager:refresh-views", this._render.bind(this)));
	}

	private _render() {
		if (this._element === undefined) this._element = this._api.get(this._path) as ElementInterface | undefined;

		if (!this._element || this._root === undefined) return;

		this._path = this._element.path;

		const component: React.FC | undefined = this._components.get(this._element.system)?.get(this._element.type);

		if (!component) return;

		let isInPopover = false;
		setTimeout(() => {
			let currentElement = this.containerEl;
			while (currentElement) {
				if (currentElement.classList.contains("popover")) {
					isInPopover = true;
					break;
				}
				currentElement = currentElement.parentElement;
			}

			const elementComponent = createElement<ElementProps>(component, {
				element: this._element,
				isInPopover: isInPopover,
				key: this._element.version.toString(),
			});
			const reactComponent = createElement(ApiContext.Provider, { value: this._api }, elementComponent);

			this._root.render(reactComponent);
		}, 0);
	}

	onload() {
		super.onload();

		this._render();
	}
}
