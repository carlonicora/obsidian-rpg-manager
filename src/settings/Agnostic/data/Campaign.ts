import {AbstractRpgOutlineData} from "../../../abstracts/AbstractRpgOutlineData";
import {CampaignInterface} from "../../../interfaces/data/CampaignInterface";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {CachedMetadata, TFile} from "obsidian";

export class Campaign extends AbstractRpgOutlineData implements CampaignInterface {
	public campaignId: number;
	public currentDate: Date|null;
	public settings: CampaignSetting;

	public reload(
		file: TFile,
		metadata: CachedMetadata,
	) {
		super.reload(file, metadata);

		if (this.frontmatter?.tags) this.campaignId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(this.type, this.tag);
		if (this.frontmatter?.dates?.current) this.currentDate = new Date(this.frontmatter?.dates?.current);
		this.settings = this.frontmatter?.settings ? CampaignSetting[this.frontmatter?.settings as keyof typeof CampaignSetting] : CampaignSetting.Agnostic;
	}

	public initialiseNeighbours(
	): void {
	}
}
