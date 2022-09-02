import {TimelineListInterface} from "../../../interfaces/data/TimelineListInterface";
import {TimelineDataInterface} from "../../../interfaces/data/TimelineDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {AbstractDataList} from "../../../abstracts/AbstractDataList";

export class TimelineList extends AbstractDataList implements TimelineListInterface {
	public elements: TimelineDataInterface[];

	constructor(
		campaign: CampaignDataInterface,
	) {
		super(campaign);
		this.elements = [];
	}

	sort(){
		this.elements.sort((a,b) => {
			return a.datetime - b.datetime;
		});
	}
}
