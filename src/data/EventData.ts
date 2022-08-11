import {GenericDataInterface,
	GenericDataListInterface, GenericImageDataInterface
} from "../interfaces/DataInterfaces";
import {RpgFunctions} from "./functions/RpgFunctions";
import {AbstractDataList, AbstractImageData} from "../abstracts/AbstractData";
import {CampaignDataInterface} from "./CampaignData";

export interface EventListInterface extends GenericDataListInterface{
	elements: EventDataInterface[];
}

export interface EventDataInterface extends GenericDataInterface, GenericImageDataInterface {
	date: string;
	synopsis: string;
}

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
		functions: RpgFunctions,
		data: Record<string, any>,
		public campaign: CampaignDataInterface|null,
		useAdditionalInformation: string|null = null,
	) {
		super(functions, data);

		if (data.dates.event != null) this.date = this.functions.formatDate(data.dates.event, "short");
		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
