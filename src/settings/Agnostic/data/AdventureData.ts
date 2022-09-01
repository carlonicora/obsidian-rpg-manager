import {AbstractData} from "../../../abstracts/AbstractData";
import {DataType} from "../../../enums/DataType";
import {AdventureDataInterface} from "../../../interfaces/data/AdventureDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {RpgFunctions} from "../../../RpgFunctions";

export class AdventureData extends AbstractData implements AdventureDataInterface {
	public id: number;
	public synopsis: string;

	constructor(
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
	) {
		super(data);

		this.id = RpgFunctions.getTagId(data.tags, DataType.Adventure);
		this.synopsis = data.synopsis;
	}
}
