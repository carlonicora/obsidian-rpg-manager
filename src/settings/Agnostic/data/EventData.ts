import {EventDataInterface} from "../../../interfaces/data/EventDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {RpgFunctions} from "../../../RpgFunctions";
import {AbstractImageData} from "../../../abstracts/AbstractImageData";

export class EventData extends AbstractImageData implements EventDataInterface {
	public date: string;
	public time: string;
	public synopsis: string;

	constructor(
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		useAdditionalInformation: string|null = null,
	) {
		super(data);

		if (data.dates.event != null) this.date = RpgFunctions.formatDate(data.dates.event, "short");
		if (data.dates.event != null) this.time = RpgFunctions.formatTime(data.dates.event);
		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
