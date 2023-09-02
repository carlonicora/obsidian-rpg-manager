import { RpgManagerInterface } from "@/RpgManagerInterface";
import { ApiContext } from "@/contexts/ApiContext";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { ItemView, View, WorkspaceLeaf } from "obsidian";
import { createElement } from "react";
import { Root, createRoot } from "react-dom/client";
import UpdaterComponent from "../components/UpdaterComponent";

export class UpdaterView extends ItemView implements View {
	protected viewType = "rpg-manager-updater";
	protected displayText = "Update RPG Manager";
	public icon = "d20";
	private _element: ElementInterface | undefined;
	private _root: Root | undefined = undefined;

	constructor(private _api: RpgManagerInterface, leaf: WorkspaceLeaf) {
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
		const elementComponent = createElement(UpdaterComponent);
		const reactComponent = createElement(ApiContext.Provider, { value: this._api }, elementComponent);

		this._root.render(reactComponent);
	}
}
