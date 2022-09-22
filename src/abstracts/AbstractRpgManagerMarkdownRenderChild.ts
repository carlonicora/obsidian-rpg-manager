import {App, MarkdownRenderChild} from "obsidian";
import {RpgManagerSettingsInterface} from "../settings/RpgManagerSettingsInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {FactoriesInterface} from "../interfaces/FactoriesInterface";
import {TagHelper} from "../helpers/TagHelper";
import {RpgManagerHelperInterface} from "../interfaces/RpgManagerHelperInterface";

export abstract class AbstractRpgManagerMarkdownRenderChild extends MarkdownRenderChild implements RpgManagerHelperInterface {
	constructor(
		public app: App,
		protected container: HTMLElement,
	) {
		super(container);
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
}
