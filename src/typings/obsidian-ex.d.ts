import "obsidian";
import { RPGManager } from "src/interfaces/RPGManager";
import RpgManagerPlugin from "src/main";

export type CalendarEventTree = Map<string, Set<number>>;

declare global {
	interface Window {
		RpgManagerAPI?: RPGManager;
	}
}

declare module "obsidian" {
	function getIcon(iconId: string, size?: number): SVGSVGElement | null;

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
			getPlugin(plugin: "rpg-manager"): RpgManagerPlugin;
			enabledPlugins: Set<string>;
		};
	}

	interface Workspace {
		on(name: "rpgmanager:refresh-option-view", callback: () => void, ctx?: any): EventRef;
		on(name: "rpgmanager:refresh-views", callback: () => void, ctx?: any): EventRef;
	}
}
