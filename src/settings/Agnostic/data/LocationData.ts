import {Api} from "../../../Api";
import {AbstractDataList, AbstractImageData} from "../../../abstracts/AbstractData";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {LocationDataInterface} from "../../../interfaces/data/LocationDataInterface";
import {LocationListInterface} from "../../../interfaces/data/LocationListInterface";

export class LocationList extends AbstractDataList implements LocationListInterface {
	public elements: LocationDataInterface[];

	constructor(
		campaign: CampaignDataInterface|null,
	) {
		super(campaign);
		this.elements = [];
	}
}

export class LocationData extends AbstractImageData implements LocationDataInterface {
	synopsis: string;
	address: string;

	constructor(
		api: Api,
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		useAdditionalInformation: string|null = null,
	) {
		super(api, data);

		this.address = data.address;

		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
