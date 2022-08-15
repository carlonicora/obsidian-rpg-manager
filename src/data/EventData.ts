import {GenericDataInterface,
	GenericDataListInterface, GenericImageDataInterface
} from "../interfaces/DataInterfaces";
import {Api} from "../api";
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

	public static frontmatter = {
		'synopsis': true,
		'dates': {
			'event': true,
		},
		'relationships': {
			'characters': true,
			'clues': true,
			'locations': true,
		},
	};

	constructor(
		api: Api,
		data: Record<string, any>,
		public campaign: CampaignDataInterface|null,
		useAdditionalInformation: string|null = null,
	) {
		super(api, data);

		if (data.dates.event != null) this.date = this.api.formatDate(data.dates.event, "short");
		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
