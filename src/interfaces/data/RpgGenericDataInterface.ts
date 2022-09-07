import {RpgDataInterface} from "./RpgDataInterface";
import {BaseCampaignInterface} from "./BaseCampaignInterface";

export interface RpgGenericDataInterface extends RpgDataInterface{
	isOutline: boolean;
	campaign: BaseCampaignInterface;
}
