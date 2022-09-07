import "obsidian";
import {RpgManagerSettings} from "../main";
import {RpgFunctions} from "../data/RpgFunctions";
import {RpgData} from "../data/RpgData";

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
				functions: RpgFunctions;
				io: RpgData;
			};
			enabledPlugins: Set<string>;
		};
	}

	interface Workspace {
		on(name: "rpgmanager:refresh-views", callback: () => void, ctx?: any): EventRef;
	}
}
