import {AbstractImageData} from "../../../abstracts/AbstractData";
import {CampaignSetting} from "../../../enums/CampaignSetting";
import {DataType} from "../../../enums/DataType";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {RpgFunctions} from "../../../RpgFunctions";
import {ErrorFactory} from "../../../factories/ErrorFactory";

export class CampaignData extends AbstractImageData implements CampaignDataInterface {
	public id: number;
	public currentDate: string;
	public settings: CampaignSetting;

	constructor(
		data: Record<string, any>,
	) {
		super(data);
		this.currentDate = data.dates.current;

		this.id = RpgFunctions.getTagId(data.tags, DataType.Campaign);

		if (data.settings == null){
			this.settings = CampaignSetting.Agnostic;
		} else {
			try {
				this.settings = CampaignSetting[data.settings as keyof typeof CampaignSetting];
			} catch (e) {
				ErrorFactory.create('Campaign Settings is not correct');
				this.settings = CampaignSetting.Agnostic;
			}
		}
	}
}
