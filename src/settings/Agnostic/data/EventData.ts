import {AbstractImageData} from "../../../abstracts/AbstractData";
import {EventDataInterface} from "../../../interfaces/data/EventDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {RpgFunctions} from "../../../RpgFunctions";

export class EventData extends AbstractImageData implements EventDataInterface {
	public date: string;
	public synopsis: string;

	constructor(
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		useAdditionalInformation: string|null = null,
	) {
		super(data);

		if (data.dates.event != null) this.date = RpgFunctions.formatDate(data.dates.event, "short");
		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
