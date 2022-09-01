import "obsidian";
import {DataviewApi} from "obsidian-dataview/lib/api/plugin-api";
import {TFile} from "obsidian";

declare module "obsidian" {
	interface Vault {
		getAvailablePathForAttachments: (
			fileName: string,
			extension?: string,
			currentFile?: TFile
		) => Promise<string>;
		config: {
			attachmentFolderPath: string;
		};
	}

	interface MetadataCache {
		trigger(...args: Parameters<MetadataCache["on"]>): void;
		trigger(name: string, ...data: any[]): void;
	}

	interface Vault {
		getAvailablePathForAttachments: (
			fileName: string,
			extension?: string,
			currentFile?: TFile
		) => Promise<string>;
		config: {
			attachmentFolderPath: string;
		};
	}

	interface App {
		appId?: string;
		plugins: {
			enabledPlugins: Set<string>;
			plugins: {
				dataview: {
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
