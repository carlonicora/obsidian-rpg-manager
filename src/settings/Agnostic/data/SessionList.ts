import {AbstractDataList} from "../../../abstracts/AbstractData";
import {SessionListInterface} from "../../../interfaces/data/SessionListInterface";
import {SessionDataInterface} from "../../../interfaces/data/SessionDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";

export class SessionList extends AbstractDataList implements SessionListInterface {
	public elements: SessionDataInterface[];

	constructor(
		campaign: CampaignDataInterface,
	) {
		super(campaign);
		this.elements = [];
	}
}
