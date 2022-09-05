import {GenericImageDataInterface} from "./GenericImageDataInterface";
import {DateTime} from "obsidian-dataview";
import {CampaignDataInterface} from "./CampaignDataInterface";

export interface TimelineDataInterface extends GenericImageDataInterface {
	synopsis: string;
	time: string;
	date: string;
	additionalInformation: string|null;
	datetime: DateTime;

	campaign: CampaignDataInterface;
}
