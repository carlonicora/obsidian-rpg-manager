import {GenericDataInterface} from "./GenericDataInterface";
import {CampaignDataInterface} from "./CampaignDataInterface";

export interface GenericDataListInterface {
	elements: GenericDataInterface[];
	campaign: CampaignDataInterface|null;

	add(
		data: GenericDataInterface,
	): void;

	map(
		data: GenericDataInterface,
	): Map<string, any>;
}
