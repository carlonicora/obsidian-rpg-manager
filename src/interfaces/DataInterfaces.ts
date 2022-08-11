import {CampaignDataInterface} from "../data/CampaignData";

export interface GenericDataInterface {
	link: string;
	name: string;
	path: string;
}

export interface GenericImageDataInterface extends GenericDataInterface{
	imageSrc: string|null;
	image: string;

	getImage(
		width: number,
		height: number,
	): string;
}

export interface GenericSynopsisDataInterface extends GenericDataInterface{
	synopsis: string;
	death: string;
	isCharacter: boolean;
	title: string|null;
}

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
