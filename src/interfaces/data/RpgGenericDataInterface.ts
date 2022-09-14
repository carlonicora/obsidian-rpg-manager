import {RpgDataInterface} from "./RpgDataInterface";
import {BaseCampaignInterface} from "./BaseCampaignInterface";
import {RpgDataListInterface} from "./RpgDataListInterface";

export interface RpgGenericDataInterface extends RpgDataInterface{
	isOutline: boolean;
	campaign: BaseCampaignInterface;
}
