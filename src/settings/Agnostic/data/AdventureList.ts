import {AdventureListInterface} from "../../../interfaces/data/AdventureListInterface";
import {AdventureDataInterface} from "../../../interfaces/data/AdventureDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {AbstractDataList} from "../../../abstracts/AbstractDataList";

export class AdventureList extends AbstractDataList implements AdventureListInterface {
	public elements: AdventureDataInterface[];

	constructor(
		campaign: CampaignDataInterface,
	) {
		super(campaign);
		this.elements = [];
	}
}
