import {App, MarkdownRenderChild} from "obsidian";
import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {FactoriesInterface} from "../interfaces/FactoriesInterface";
import {TagHelper} from "../helpers/TagHelper";

export abstract class AbstractRpgManagerMarkdownRenderChild extends MarkdownRenderChild {
	public settings: RpgManagerSettingsInterface;
	public database: DatabaseInterface;
	public factories: FactoriesInterface;
	public tagHelper: TagHelper;

	constructor(
		public app: App,
		protected container: HTMLElement,
	) {
		super(container);

		this.settings = this.app.plugins.getPlugin('rpg-manager').settings;
		this.database = this.app.plugins.getPlugin('rpg-manager').database;
		this.factories = this.app.plugins.getPlugin('rpg-manager').factories;
		this.tagHelper = this.app.plugins.getPlugin('rpg-manager').tagHelper;
	}

	updateSettings(settings: Partial<RpgManagerSettingsInterface>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
