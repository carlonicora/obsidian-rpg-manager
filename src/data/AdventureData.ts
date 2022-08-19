import {GenericDataInterface, GenericDataListInterface} from "../interfaces/DataInterfaces";
import {Api} from "../api";
import {AbstractData, AbstractDataList} from "../abstracts/AbstractData";
import {CampaignDataInterface} from "./CampaignData";
import {DataType} from "../io/IoData";

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

	public static frontmatter = {
		'synopsis': true,
		'ids': {
			'adventure': true
		},
	};

	constructor(
		api: Api,
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
	) {
		super(api, data);

		this.id = this.api.getTagId(data.tags, DataType.Adventure);
		this.synopsis = data.synopsis;
	}
}
