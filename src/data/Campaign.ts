import {AbstractOutlineRecord} from "../abstracts/AbstractOutlineRecord";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {CampaignSetting} from "../enums/CampaignSetting";
import {DataType} from "../enums/DataType";
import {FrontMatterCache} from "obsidian";

export class Campaign extends AbstractOutlineRecord implements CampaignInterface {
	public campaignId: number;
	public currentDate: Date|null;
	public settings: CampaignSetting;

	protected initialiseData(
		frontmatter: FrontMatterCache|undefined,
	): void {
		this.campaignId = this.id.getTypeValue(DataType.Campaign);
		if (frontmatter?.dates?.current) this.currentDate = new Date(frontmatter?.dates?.current);

		if (frontmatter?.settings !== undefined) {
			try {
				this.settings = CampaignSetting[frontmatter?.settings as keyof typeof CampaignSetting];
			} catch (e) {
				this.settings = CampaignSetting.Agnostic;
			}
		}

		if (this.settings === undefined) this.settings = CampaignSetting.Agnostic;

		super.initialiseData(frontmatter);
	}
}
