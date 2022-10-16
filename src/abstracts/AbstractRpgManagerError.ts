import {RpgErrorInterface} from "../errors/interfaces/RpgErrorInterface";
import {App} from "obsidian";
import {IdInterface} from "../id/interfaces/IdInterface";
import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {FactoriesInterface} from "../factories/interfaces/FactoriesInterface";
import {TagHelper} from "../databases/TagHelper";
import {RpgManagerHelperInterface} from "../interfaces/RpgManagerHelperInterface";
import {ManipulatorsInterface} from "../manipulators/interfaces/ManipulatorsInterface";
import {DatabaseInterface} from "../databases/interfaces/DatabaseInterface";

export abstract class AbstractRpgManagerError extends Error implements RpgErrorInterface, RpgManagerHelperInterface {
	constructor(
		public app: App,
		public id: IdInterface|undefined,
	) {
		super();
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

	public updateSettings(
		settings: Partial<RpgManagerSettingsInterface>,
		partial = true,
	): Promise<void> {
		return this.app.plugins.getPlugin('rpg-manager').updateSettings(settings, partial);
	}

	public getErrorTitle(
	): string|undefined {
		return undefined;
	}

	public abstract showErrorMessage(
	): string;

	public abstract showErrorActions(
	): string;

	public getErrorLinks(
	): string[]|undefined {
		return undefined;
	}
}
