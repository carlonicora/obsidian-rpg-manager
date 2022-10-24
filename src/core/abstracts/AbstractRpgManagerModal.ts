import {RpgManagerSettingsInterface} from "../../settings/RpgManagerSettingsInterface";
import {FactoriesInterface} from "../interfaces/FactoriesInterface";
import {TagHelper} from "../../database/TagHelper";
import {App, Modal} from "obsidian";
import {RpgManagerHelperInterface} from "../interfaces/RpgManagerHelperInterface";
import {ManipulatorsInterface} from "../../services/manipulators/interfaces/ManipulatorsInterface";
import {DatabaseInterface} from "../../database/interfaces/DatabaseInterface";
import {ServiceManagerInterface} from "../../api/servicesManager/interfaces/ServiceManagerInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";

export abstract class AbstractRpgManagerModal extends Modal implements RpgManagerHelperInterface {
	constructor(
		public app: App,
	) {
		super(app);
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
}
