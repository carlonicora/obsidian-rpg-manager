import {AbstractDataList} from "../../../abstracts/AbstractData";
import {EventListInterface} from "../../../interfaces/data/EventListInterface";
import {EventDataInterface} from "../../../interfaces/data/EventDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";

export class EventList extends AbstractDataList implements EventListInterface {
	public elements: EventDataInterface[];

	constructor(
		campaign: CampaignDataInterface,
	) {
		super(campaign);
		this.elements = [];
	}
}
