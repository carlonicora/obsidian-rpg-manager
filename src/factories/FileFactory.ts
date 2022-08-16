import {DataType} from "../io/IoData";
import {Api} from "../api";
import * as Templates from '../views/templates';
import {TemplateInterface} from "../interfaces/TemplateInterface";
import {CachedMetadata, TagCache, TFile} from "obsidian";

export class FileFactory {
	constructor(
		private api: Api,
	) {
	}

	async create(
		type: DataType,
	): Promise<void>
	{
		let multipleCampaigns = false;
		let campaignId = '{campaignId}';
		this.api.app.vault.getFiles().forEach((file: TFile) => {
			if (!multipleCampaigns) {
				const metadata: CachedMetadata | null = this.api.app.metadataCache.getFileCache(file);
				if (metadata !== null) {
					(metadata.tags || []).forEach((t: TagCache) => {
						if (t.tag.startsWith(this.api.settings.campaignIdentifier)) {
							if (campaignId !== '{campaignId}' && !multipleCampaigns) {
								multipleCampaigns = true;
								campaignId = '{campaignId}';
							}
							campaignId = t.tag.substring(t.tag.lastIndexOf(this.api.settings.campaignIdentifier) + 1);
						}
					});
				}
			}
		});

		if (!multipleCampaigns && campaignId === '{campaignId}'){
			campaignId = '1';
		}

		//@ts-ignore
		const template: TemplateInterface = new Templates[DataType[type] + 'Template'](this.api.settings, campaignId);
		const data: string = template.generateData();

		const newFile = await this.api.app.vault.create(DataType[type] + ' ' + (new Date()).toISOString().replace(/[^0-9]/g, '').slice(0, -3) + '.md', data);

		const leaf = this.api.app.workspace.getLeaf(false);

		await leaf.openFile(newFile);
	}
}
