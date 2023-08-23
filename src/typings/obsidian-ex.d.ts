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
		// on(name: "rpgmanager:database-ready", callback: () => void, ctx?: any): EventRef;
		on(name: "rpgmanager:refresh-views", callback: () => void, ctx?: any): EventRef;
		// on(name: "rpgmanager:force-refresh-views", callback: () => void, ctx?: any): EventRef;
		// on(name: "rpgmanager:index-complete", callback: () => void, ctx?: any): EventRef;
		// on(name: "fantasy-calendars-settings-loaded", callback: () => void, ctx?: any): EventRef;
		// on(name: "fantasy-calendars-updated", callback: () => void, ctx?: any): EventRef;
		// on(name: "fantasy-calendars-event-update", callback: (tree: CalendarEventTree) => any): EventRef;
	}
}
