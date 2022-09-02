import {ClueListInterface} from "../../../interfaces/data/ClueListInterface";
import {ClueDataInterface} from "../../../interfaces/data/ClueDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {AbstractDataList} from "../../../abstracts/AbstractDataList";

export class ClueList extends AbstractDataList implements ClueListInterface {
	public elements: ClueDataInterface[];

	constructor(
		campaign: CampaignDataInterface,
	) {
		super(campaign);
		this.elements = [];
	}
}
