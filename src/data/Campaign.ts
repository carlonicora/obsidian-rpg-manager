import {AbstractOutlineRecord} from "../abstracts/AbstractOutlineRecord";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {CampaignSetting} from "../enums/CampaignSetting";
import {FrontMatterCache} from "obsidian";

export class Campaign extends AbstractOutlineRecord implements CampaignInterface {
	public campaignId: number;
	public currentDate: Date|null;
	public campaignSettings: CampaignSetting;

	protected initialiseData(
		frontmatter: FrontMatterCache|undefined,
	): void {
		this.campaignId = this.id.campaignId;
		if (frontmatter?.dates?.current) this.currentDate = new Date(frontmatter?.dates?.current);

		if (frontmatter?.settings !== undefined) {
			try {
				this.campaignSettings = CampaignSetting[frontmatter?.settings as keyof typeof CampaignSetting];
			} catch (e) {
				this.campaignSettings = CampaignSetting.Agnostic;
			}
		}

		if (this.campaignSettings === undefined) this.campaignSettings = CampaignSetting.Agnostic;

		super.initialiseData(frontmatter);
	}
}
