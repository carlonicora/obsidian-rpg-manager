import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {App} from "obsidian";
import {FactoriesInterface} from "../factories/interfaces/FactoriesInterface";
import {TagHelper} from "../databases/TagHelper";
import {RpgManagerHelperInterface} from "../interfaces/RpgManagerHelperInterface";
import {ManipulatorsInterface} from "../manipulators/interfaces/ManipulatorsInterface";
import {DatabaseInterface} from "../databases/interfaces/DatabaseInterface";

export abstract class AbstractRpgManager implements RpgManagerHelperInterface {
	constructor(
		public app: App,
	) {
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

	public set database(
		database: DatabaseInterface,
	) {
		this.app.plugins.getPlugin('rpg-manager').database = database;
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

	public updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
	): Promise<void> {
		return this.app.plugins.getPlugin('rpg-manager').updateSettings(settings);
	}
}
