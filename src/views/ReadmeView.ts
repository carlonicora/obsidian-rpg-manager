import { RpgManagerInterface } from "@/RpgManagerInterface";
import MarkdownComponent from "@/components/markdowns/MarkdownComponent";
import { ApiContext } from "@/contexts/ApiContext";
import { AppContext } from "@/contexts/AppContext";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { App, ItemView, View, WorkspaceLeaf } from "obsidian";
import { createElement } from "react";
import { Root, createRoot } from "react-dom/client";

export class ReadmeView extends ItemView implements View {
	protected viewType = "rpg-manager-readme";
	protected displayText = "RPG Manager Documentation";
	public icon = "d20";
	private _element: ElementInterface | undefined;
	private _root: Root | undefined = undefined;

	constructor(private _app: App, private _api: RpgManagerInterface, leaf: WorkspaceLeaf) {
		super(leaf);

		this._root = createRoot(this.contentEl);
	}

	getViewType(): string {
		return this.viewType;
	}

	onResize() {
		super.onResize();
		this.render();
	}

	getDisplayText(): string {
		return this.displayText;
	}

	protected async onOpen(): Promise<void> {
		this.render();
	}

	async render(): Promise<void> {
		const readmeUrl = "https://raw.githubusercontent.com/carlonicora/obsidian-rpg-manager/master/README.md";

		const response = await fetch(readmeUrl);
		const readmeContent = await response.text();

		const elementComponent = createElement(MarkdownComponent, {
			value: readmeContent,
		});

		const reactComponent = createElement(
			AppContext.Provider,
			{ value: this._app },
			createElement(ApiContext.Provider, { value: this._api }, elementComponent)
		);

		this._root.render(reactComponent);
	}
}
