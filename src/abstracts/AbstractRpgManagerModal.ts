import {RpgManagerInterface} from "../interfaces/RpgManagerInterface";
import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {FactoriesInterface} from "../interfaces/FactoriesInterface";
import {TagHelper} from "../helpers/TagHelper";
import {App, Modal} from "obsidian";

export abstract class AbstractRpgManagerModal extends Modal implements RpgManagerInterface {
	public settings: RpgManagerSettingsInterface;
	public database: DatabaseInterface;
	public factories: FactoriesInterface;
	public tagHelper: TagHelper;

	constructor(
		public app: App,
	) {
		super(app);

		this.settings = this.app.plugins.getPlugin('rpg-manager').settings;
		this.database = this.app.plugins.getPlugin('rpg-manager').database;
		this.factories = this.app.plugins.getPlugin('rpg-manager').factories;
		this.tagHelper = this.app.plugins.getPlugin('rpg-manager').tagHelper;
	}

	updateSettings(settings: Partial<RpgManagerSettingsInterface>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
