import "obsidian";
import {RpgManagerInterface} from "../interfaces/RpgManagerInterface";
import "obsidian-fantasy-calendar";

declare module "obsidian" {
	function getIcon(iconId: string, size?: number): SVGSVGElement|null;

	interface MetadataCache {
		trigger(...args: Parameters<MetadataCache["on"]>): void;
		trigger(name: string, ...data: any[]): void;
	}

	interface Vault {
		config: {
			attachmentFolderPath: string;
		};
		adapter: DataAdapter;
	}

	interface DataAdapter {
		basePath?: string;
	}

	interface App {
		appId?: string;
		plugins: {
			getPlugin(plugin: "rpg-manager"): RpgManagerInterface;
			getPlugin(plugin: "fantasy-calendar"): any;
			enabledPlugins: Set<string>;
		};
	}

	interface Workspace {
		on(name: "rpgmanager:refresh-views", callback: () => void, ctx?: any): EventRef;
		on(name: "rpgmanager:force-refresh-views", callback: () => void, ctx?: any): EventRef;
		on(name: "rpgmanager:index-complete", callback: () => void, ctx?: any): EventRef;
	}
}
