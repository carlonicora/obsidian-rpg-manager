import {App, ItemView, TFile, View, WorkspaceLeaf} from "obsidian";
import {RpgManagerHelperInterface} from "../interfaces/RpgManagerHelperInterface";
import {RpgManagerSettingsInterface} from "../../settings/RpgManagerSettingsInterface";
import {FactoriesInterface} from "../interfaces/FactoriesInterface";
import {TagHelper} from "../../database/TagHelper";
import {base} from "w3c-keyname";
import {ManipulatorsInterface} from "../../services/manipulators/interfaces/ManipulatorsInterface";
import {DatabaseInterface} from "../../database/interfaces/DatabaseInterface";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {ServiceManagerInterface} from "../../api/servicesManager/interfaces/ServiceManagerInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export abstract class AbstractRpgManagerView extends ItemView implements View, RpgManagerHelperInterface {
	protected viewType: string;
	protected displayText: string;

	protected rpgmContentEl: HTMLDivElement;

	constructor(
		public app: App,
		leaf: WorkspaceLeaf,
	) {
		super(leaf);
	}

	public get api(): RpgManagerApiInterface {
		return this.app.plugins.getPlugin('rpg-manager').api;
	}

	public get pluginVersion(): string {
		return this.app.plugins.getPlugin('rpg-manager').version;
	}

	public get settings(
	): RpgManagerSettingsInterface {
		return this.app.plugins.getPlugin('rpg-manager').settings;
	}

	public get database(
	): DatabaseInterface {
		return this.app.plugins.getPlugin('rpg-manager').database;
	}

	public get factories(
	): FactoriesInterface {
		return this.app.plugins.getPlugin('rpg-manager').factories;
	}

	public get manipulators(
	): ManipulatorsInterface {
		return this.app.plugins.getPlugin('rpg-manager').manipulators;
	}

	public get tagHelper(
	): TagHelper {
		return this.app.plugins.getPlugin('rpg-manager').tagHelper;
	}

	public get services(
	): ServiceManagerInterface {
		return this.app.plugins.getPlugin("rpg-manager").services;
	}

	public updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
		partial = true,
	): Promise<void> {
		return this.app.plugins.getPlugin('rpg-manager').updateSettings(settings, partial);
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
		if (base == undefined) return;

		const component: ModelInterface|undefined = this.database.read<ModelInterface>((data: ModelInterface) => data.file.basename === basename)[0];
		if (component === undefined) return;

		const file: TFile = component.file;
		element.addEventListener("click", (ev:MouseEvent) => {
			ev.preventDefault();
			this.app.workspace.getLeaf(true).openFile(file);
		});
		element.href = '#';
	}
}
