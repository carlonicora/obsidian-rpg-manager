import {App, ItemView, View, WorkspaceLeaf} from "obsidian";
import {RpgManagerHelperInterface} from "../interfaces/RpgManagerHelperInterface";
import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {FactoriesInterface} from "../interfaces/FactoriesInterface";
import {TagHelper} from "../helpers/TagHelper";

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

	public get tagHelper(
	): TagHelper {
		return this.app.plugins.getPlugin('rpg-manager').tagHelper;
	}

	public updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
	): Promise<void> {
		return this.app.plugins.getPlugin('rpg-manager').updateSettings(settings);
	}

	public initialise(
		params: Array<any>,
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

		this.rpgmContentEl = container.createDiv({cls: 'rpgm-right-view'});
		this.rpgmContentEl.createEl("h2", { text: this.displayText });
	}

	public abstract render(
	): Promise<void>;

	protected async onClose(
	): Promise<void> {
	}
}
