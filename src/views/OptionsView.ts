import { RpgManagerInterface } from "@/RpgManagerInterface";
import OptionContainerComponent from "@/components/options/OptionContainerComponent";
import { ApiContext } from "@/contexts/ApiContext";
import { AppContext } from "@/contexts/AppContext";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { App, ItemView, TFile, View, WorkspaceLeaf } from "obsidian";
import { createElement } from "react";
import { Root, createRoot } from "react-dom/client";

export class OptionView extends ItemView implements View {
  protected viewType = "rpg-manager-options";
  protected displayText = "RPG Manager";
  public icon = "d20";
  private _element: ElementInterface | undefined;
  private _root: Root | undefined = undefined;

  constructor(
    private _app: App,
    private _api: RpgManagerInterface,
    leaf: WorkspaceLeaf,
  ) {
    super(leaf);

    this._root = createRoot(this.contentEl);

    this.registerEvent(
      _app.workspace.on(
        "rpgmanager:refresh-option-view",
        this.render.bind(this),
      ),
    );
    this.registerEvent(
      _app.workspace.on("rpgmanager:refresh-views", this.render.bind(this)),
    );
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

    if (file != undefined)
      this._element = this._api.get({ path: file.path }) as
        | ElementInterface
        | undefined;

    const elementComponent = createElement(OptionContainerComponent, {
      element: this._element,
      file: file ?? undefined,
      key: this._element?.id ?? "" + this._element?.version.toString(),
    });

    const reactComponent = createElement(
      AppContext.Provider,
      { value: this._app },
      createElement(
        ApiContext.Provider,
        { value: this._api },
        elementComponent,
      ),
    );
    //const reactComponent = createElement(ApiContext.Provider, { value: this._api }, elementComponent);

    this._root.render(reactComponent);
  }
}
