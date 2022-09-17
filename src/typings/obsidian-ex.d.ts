import "obsidian";
import {RpgManagerSettings} from "../main";
import {Functions} from "../helpers/Functions";
import {Factories} from "../helpers/Factories";
import {TagManager} from "../helpers/TagManager";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";

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
			getPlugin(plugin: "rpg-manager"): {
				settings: RpgManagerSettings;
				functions: Functions;
				database: DatabaseInterface;
				factories: Factories;
				tagManager: TagManager;
			};
			enabledPlugins: Set<string>;
		};
	}

	interface Workspace {
		on(name: "rpgmanager:refresh-views", callback: () => void, ctx?: any): EventRef;
		on(name: "rpgmanager:index-complete", callback: () => void, ctx?: any): EventRef;
	}
}
