import {CampaignDataInterface} from "../data/CampaignData";
import {Pronoun} from "../data";

export interface GenericDataInterface {
	link: string;
	name: string;
	path: string;
	completed: boolean;
}

export interface GenericImageDataInterface extends GenericDataInterface{
	imageSrc: string|null;
	image: string;
	imageSrcElement: HTMLImageElement|null;

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
	pronoun: Pronoun|null;
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
