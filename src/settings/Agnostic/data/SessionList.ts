import {SessionListInterface} from "../../../interfaces/data/SessionListInterface";
import {SessionDataInterface} from "../../../interfaces/data/SessionDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {AbstractDataList} from "../../../abstracts/AbstractDataList";

export class SessionList extends AbstractDataList implements SessionListInterface {
	public elements: SessionDataInterface[];

	constructor(
		campaign: CampaignDataInterface,
	) {
		super(campaign);
		this.elements = [];
	}
}
