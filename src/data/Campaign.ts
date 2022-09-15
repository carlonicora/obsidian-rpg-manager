import {AbstractOutlineData} from "../abstracts/database/AbstractOutlineData";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {CampaignSetting} from "../enums/CampaignSetting";

export class Campaign extends AbstractOutlineData implements CampaignInterface {
	public campaignId: number;
	public currentDate: Date|null;
	public settings: CampaignSetting;

	protected loadData(
	): void {
		this.campaignId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(this.type, this.tag);
		if (this.frontmatter?.dates?.current) this.currentDate = new Date(this.frontmatter?.dates?.current);
		this.settings = this.frontmatter?.settings ? CampaignSetting[this.frontmatter?.settings as keyof typeof CampaignSetting] : CampaignSetting.Agnostic;

		super.loadData();
	}
}
