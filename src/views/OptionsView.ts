import { App, ItemView, TFile, View, WorkspaceLeaf } from "obsidian";
import { Root, createRoot } from "react-dom/client";
// import OptionContainerComponent from "src/components/options/OptionContainerComponent";
import { Element } from "src/interfaces/Element";
import { RPGManager } from "src/interfaces/RPGManager";

export class OptionsView extends ItemView implements View {
	protected viewType = "rpg-manager-options";
	protected displayText = "RPG Manager";
	public icon = "d20";
	private _element: Element | undefined;
	private _root: Root | undefined = undefined;

	constructor(private _app: App, private _api: RPGManager, leaf: WorkspaceLeaf) {
		super(leaf);

		this._root = createRoot(this.containerEl);

		this.registerEvent(_app.workspace.on("rpgmanager:refresh-option-view", this.render.bind(this)));
		this.registerEvent(_app.workspace.on("rpgmanager:refresh-views", this.render.bind(this)));
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

		if (file != undefined) this._element = this._api.getByPath(file.path) as Element | undefined;

		// const elementComponent = createElement(OptionContainerComponent, {
		// 	element: this._element,
		// 	file: file ?? undefined,
		// 	key: this._element?.id ?? "" + this._element?.version.toString(),
		// });

		// const reactComponent = createElement(
		// 	AppContext.Provider,
		// 	{ value: this._app },
		// 	createElement(ApiContext.Provider, { value: this._api }, elementComponent)
		// );

		// this._root.render(reactComponent);
	}
}
