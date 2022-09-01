import {Api} from "../../../Api";
import {AbstractImageData} from "../../../abstracts/AbstractData";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {DataType} from "../../../enums/DataType";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {Factory} from "../../../Factory";

export class CampaignData extends AbstractImageData implements CampaignDataInterface {
	public id: number;
	public currentDate: string;
	public settings: CampaignSetting;

	constructor(
		api: Api,
		data: Record<string, any>,
	) {
		super(api, data);
		this.currentDate = data.dates.current;

		this.id = this.api.getTagId(data.tags, DataType.Campaign);

		if (data.settings == null){
			this.settings = CampaignSetting.Agnostic;
		} else {
			try {
				this.settings = CampaignSetting[data.settings as keyof typeof CampaignSetting];
			} catch (e) {
				Factory.createError('Campaign Settings is not correct');
				this.settings = CampaignSetting.Agnostic;
			}
		}
	}
}
