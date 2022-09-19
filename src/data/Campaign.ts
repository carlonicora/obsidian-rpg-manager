import {AbstractOutlineRecord} from "../abstracts/AbstractOutlineRecord";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {CampaignSetting} from "../enums/CampaignSetting";
import {DataType} from "../enums/DataType";

export class Campaign extends AbstractOutlineRecord implements CampaignInterface {
	public campaignId: number;
	public currentDate: Date|null;
	public settings: CampaignSetting;

	protected initialiseData(
	): void {
		this.campaignId = this.id.getTypeValue(DataType.Campaign);
		if (this.frontmatter?.dates?.current) this.currentDate = new Date(this.frontmatter?.dates?.current);
		this.settings = this.frontmatter?.settings ? CampaignSetting[this.frontmatter?.settings as keyof typeof CampaignSetting] : CampaignSetting.Agnostic;

		super.initialiseData();
	}
}
