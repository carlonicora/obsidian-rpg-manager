import "obsidian";
import {RpgManagerInterface} from "../interfaces/RpgManagerInterface";

declare module "obsidian" {
	interface MetadataCache {
		trigger(...args: Parameters<MetadataCache["on"]>): void;
		trigger(name: string, ...data: any[]): void;
	}

	interface Vault {
		config: {
			attachmentFolderPath: string;
		};
	}

	interface App {
		appId?: string;
		plugins: {
			getPlugin(plugin: "rpg-manager"): RpgManagerInterface;
	/*
	{
				settings: RpgManagerSettingsInterface;
				functions: Functions;
				database: DatabaseInterface;
				factories: Factories;
				tagManager: TagFactory;
			};

	 */
			enabledPlugins: Set<string>;
		};
	}

	interface Workspace {
		on(name: "rpgmanager:refresh-views", callback: () => void, ctx?: any): EventRef;
		on(name: "rpgmanager:index-complete", callback: () => void, ctx?: any): EventRef;
	}
}
