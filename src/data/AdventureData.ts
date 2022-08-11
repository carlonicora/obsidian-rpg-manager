import {
	GenericDataInterface,
	GenericDataListInterface
} from "../interfaces/DataInterfaces";
import {RpgFunctions} from "../functions/RpgFunctions";
import {AbstractData, AbstractDataList} from "../abstracts/AbstractData";
import {CampaignDataInterface} from "./CampaignData";

export interface AdventureListInterface extends GenericDataListInterface{
	elements: AdventureDataInterface[];
}

export interface AdventureDataInterface extends GenericDataInterface {
	id: number;
	synopsis: string;
}

export class AdventureList extends AbstractDataList implements AdventureListInterface {
	public elements: AdventureDataInterface[];

	constructor(
		campaign: CampaignDataInterface|null,
	) {
		super(campaign);
		this.elements = [];
	}
}

export class AdventureData extends AbstractData implements AdventureDataInterface {
	public id: number;
	public synopsis: string;

	constructor(
		functions: RpgFunctions,
		data: Record<string, any>,
	) {
		super(functions, data);

		this.id = data.ids.adventure;
		this.synopsis = data.synopsis;
	}
}
