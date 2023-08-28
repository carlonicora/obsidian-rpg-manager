import { RpgManagerInterface } from "@/RpgManagerInterface";
import OptionContainerComponent from "@/components/options/OptionContainerComponent";
import { ApiContext } from "@/contexts/ApiContext";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { ItemView, TFile, View, WorkspaceLeaf } from "obsidian";
import { createElement } from "react";
import { Root, createRoot } from "react-dom/client";

export class OptionView extends ItemView implements View {
	protected viewType = "rpg-manager-options";
	protected displayText = "RPG Manager";
	public icon = "d20";
	private _element: ElementInterface | undefined;
	private _root: Root | undefined = undefined;

	constructor(private _api: RpgManagerInterface, leaf: WorkspaceLeaf) {
		super(leaf);

		this._root = createRoot(this.contentEl);

		this.registerEvent(app.workspace.on("rpgmanager:refresh-option-view", this.render.bind(this)));
		this.registerEvent(app.workspace.on("rpgmanager:refresh-views", this.render.bind(this)));
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
		this._element = undefined;

		const file: TFile | null = this.app.workspace.getActiveFile();

		if (file != undefined) this._element = this._api.get(file.path) as ElementInterface | undefined;

		const elementComponent = createElement(OptionContainerComponent, {
			element: this._element,
			key: this._element?.path ?? "" + this._element?.version.toString(),
		});
		const reactComponent = createElement(ApiContext.Provider, { value: this._api }, elementComponent);

		this._root.render(reactComponent);
	}
}
