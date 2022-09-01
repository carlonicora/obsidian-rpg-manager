import {AbstractDataList} from "../../../abstracts/AbstractData";
import {FactionListInterface} from "../../../interfaces/data/FactionListInterface";
import {FactionDataInterface} from "../../../interfaces/data/FactionDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";

export class FactionList extends AbstractDataList implements FactionListInterface {
	public elements: FactionDataInterface[];

	constructor(
		campaign: CampaignDataInterface,
	) {
		super(campaign);
		this.elements = [];
	}
}
