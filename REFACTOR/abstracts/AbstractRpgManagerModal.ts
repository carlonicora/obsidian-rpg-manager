import {RpgManagerSettingsInterface} from "../../src/settings/RpgManagerSettingsInterface";
import {FactoriesInterface} from "../../src/core/interfaces/FactoriesInterface";
import {TagService} from "../../src/services/tagService/TagService";
import {App, Modal} from "obsidian";
import {RpgManagerHelperInterface} from "../../src/core/interfaces/RpgManagerHelperInterface";
import {ManipulatorsInterface} from "../services/manipulators/interfaces/ManipulatorsInterface";
import {DatabaseInterface} from "../../src/database/interfaces/DatabaseInterface";
import {ServiceManagerInterface} from "../../src/api/servicesManager/interfaces/ServiceManagerInterface";
import {RpgManagerApiInterface} from "../../src/api/interfaces/RpgManagerApiInterface";

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
	): TagService {
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
