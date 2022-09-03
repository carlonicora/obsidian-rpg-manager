import {GenericImageDataInterface} from "./GenericImageDataInterface";
import {DateTime} from "obsidian-dataview";
import {CampaignDataInterface} from "./CampaignDataInterface";

export interface TimelineDataInterface extends GenericImageDataInterface {
	synopsis: string;
	time: string;
	date: string;
	type: string;
	datetime: DateTime;

	campaign: CampaignDataInterface;

	getEventColour(): string;
}
