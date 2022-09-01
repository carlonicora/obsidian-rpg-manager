import {CampaignSetting} from "../../enums/CampaignSetting";
import {GenericDataInterface} from "./GenericDataInterface";
import {GenericImageDataInterface} from "./GenericImageDataInterface";

export interface CampaignDataInterface extends GenericDataInterface, GenericImageDataInterface {
	id: number;
	currentDate: string;
	settings: CampaignSetting;
}
