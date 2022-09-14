import {AbstractRpgData} from "./AbstractRpgData";
import {RpgGenericDataInterface} from "../interfaces/data/RpgGenericDataInterface";
import {DataType} from "../enums/DataType";
import {CampaignInterface} from "../interfaces/data/CampaignInterface";
import {RpgDataListInterface} from "../interfaces/data/RpgDataListInterface";

export abstract class AbstractRpgGenericData extends AbstractRpgData implements RpgGenericDataInterface{
	public campaign: CampaignInterface;
	public isOutline: boolean;

	public loadHierarchy(
		dataList: RpgDataListInterface,
	) {
		if (this.type !== DataType.Campaign) this.campaign = this.loadCampaign();
	}

	public loadRelationships(
		dataList: RpgDataListInterface,
	) {
		if (this.campaign === undefined) this.loadHierarchy(dataList);
		super.loadRelationships(dataList);
	}
}
