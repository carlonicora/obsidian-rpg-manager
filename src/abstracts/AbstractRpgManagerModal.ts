import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {FactoriesInterface} from "../interfaces/FactoriesInterface";
import {TagHelper} from "../helpers/TagHelper";
import {App, Modal} from "obsidian";
import {RpgManagerHelperInterface} from "../interfaces/RpgManagerHelperInterface";
import {DataManipulatorsInterface} from "../interfaces/DataManipulatorsInterface";
import {DatabaseInterface} from "../database/interfaces/DatabaseInterface";

export abstract class AbstractRpgManagerModal extends Modal implements RpgManagerHelperInterface {
	constructor(
		public app: App,
	) {
		super(app);
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

	public get dataManipulators(
	): DataManipulatorsInterface {
		return this.app.plugins.getPlugin('rpg-manager').dataManipulators;
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
