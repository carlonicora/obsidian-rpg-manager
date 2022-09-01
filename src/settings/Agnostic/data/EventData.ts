import {Api} from "../../../Api";
import {AbstractDataList, AbstractImageData} from "../../../abstracts/AbstractData";
import {EventListInterface} from "../../../interfaces/data/EventListInterface";
import {EventDataInterface} from "../../../interfaces/data/EventDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";

export class EventList extends AbstractDataList implements EventListInterface {
	public elements: EventDataInterface[];

	constructor(
		campaign: CampaignDataInterface|null,
	) {
		super(campaign);
		this.elements = [];
	}
}

export class EventData extends AbstractImageData implements EventDataInterface {
	public date: string;
	public synopsis: string;

	constructor(
		api: Api,
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		useAdditionalInformation: string|null = null,
	) {
		super(api, data);

		if (data.dates.event != null) this.date = this.api.formatDate(data.dates.event, "short");
		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
