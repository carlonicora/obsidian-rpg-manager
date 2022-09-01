import {Api} from "../../../Api";
import {AbstractData, AbstractDataList} from "../../../abstracts/AbstractData";
import {DataType} from "../../../enums/DataType";
import {AdventureDataInterface} from "../../../interfaces/data/AdventureDataInterface";
import {AdventureListInterface} from "../../../interfaces/data/AdventureListInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";

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
		api: Api,
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
	) {
		super(api, data);

		this.id = this.api.getTagId(data.tags, DataType.Adventure);
		this.synopsis = data.synopsis;
	}
}
