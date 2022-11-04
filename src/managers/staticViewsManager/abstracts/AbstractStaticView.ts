import {ItemView, TFile, View, WorkspaceLeaf} from "obsidian";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {StaticViewInterface} from "../interfaces/StaticViewInterface";

export abstract class AbstractStaticView extends ItemView implements View, StaticViewInterface {
	protected viewType: string;
	protected displayText: string;

	protected rpgmContentEl: HTMLDivElement;

	constructor(
		public api: RpgManagerApiInterface,
		leaf: WorkspaceLeaf,
	) {
		super(leaf);
	}

	public initialise(
		params: any[],
	): void {
		this.onOpenOrResize();
	}

	public getViewType(): string {
		return this.viewType;
	}

	public getDisplayText(): string {
		return this.displayText;
	}

	protected async onOpen(
	): Promise<void> {
		this.onOpenOrResize();
	}

	protected async onOpenOrResize(
	): Promise<void> {
		const container = this.containerEl.children[1];
		container.empty();

		this.rpgmContentEl = container.createDiv({cls: 'rpgm-view'});
		this.rpgmContentEl.createEl("h2", { text: this.displayText });
	}

	public abstract render(
	): Promise<void>;

	protected async onClose(
	): Promise<void> {
	}

	protected updateInternalLinks(
		element: Element,
	): void {
		if (element.children.length > 0){
			for (let index=0; index<element.children.length; index++){
				const elementChild = element.children.item(index);
				if (elementChild !== null) {
					if (elementChild instanceof HTMLAnchorElement) {
						this.updateInternalLink(<HTMLAnchorElement>elementChild);
					} else {
						this.updateInternalLinks(elementChild);
					}
				}
			}
		}
	}

	protected updateInternalLink(
		element: HTMLAnchorElement,
	): void {
		const basename: string|undefined = element.dataset.href;

		if (basename == undefined)
			return;

		const component: ModelInterface|undefined = this.api.database.read<ModelInterface>((data: ModelInterface) => data.file.basename === basename)[0];
		if (component === undefined) return;

		const file: TFile = component.file;
		element.addEventListener("click", (ev:MouseEvent) => {
			ev.preventDefault();
			this.app.workspace.getLeaf(true).openFile(file);
		});
		element.href = '#';
	}
}
