import "obsidian";
import {DataviewApi} from "obsidian-dataview/lib/api/plugin-api";

declare module "obsidian" {
	interface MetadataCache {
		trigger(...args: Parameters<MetadataCache["on"]>): void;
		trigger(name: string, ...data: any[]): void;
	}

	interface App {
		appId?: string;
		plugins: {
			enabledPlugins: Set<string>;
			plugins: {
				dataview?: {
					api: DataviewApi;
				};
			};
		};
	}

	interface Workspace {
		on(name: "rpgmanager:refresh-views", callback: () => void, ctx?: any): EventRef;
		on(name: "dataview:index-ready", callback: () => void, ctx?: any): EventRef;
	}
}
