import {AbstractDataList} from "../../../abstracts/AbstractData";
import {ClueListInterface} from "../../../interfaces/data/ClueListInterface";
import {ClueDataInterface} from "../../../interfaces/data/ClueDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";

export class ClueList extends AbstractDataList implements ClueListInterface {
	public elements: ClueDataInterface[];

	constructor(
		campaign: CampaignDataInterface,
	) {
		super(campaign);
		this.elements = [];
	}
}
