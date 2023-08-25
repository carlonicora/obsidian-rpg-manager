import "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";

export type CalendarEventTree = Map<string, Set<number>>;

declare global {
	interface Window {
		RpgManagerAPI?: RpgManagerInterface;
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
			getPlugin(plugin: "rpg-manager"): RpgManagerInterface;
			enabledPlugins: Set<string>;
		};
	}

	interface Workspace {
		on(name: "rpgmanager:refresh-option-view", callback: () => void, ctx?: any): EventRef;
		on(name: "rpgmanager:refresh-views", callback: () => void, ctx?: any): EventRef;
	}
}
