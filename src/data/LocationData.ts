import {GenericDataInterface,
	GenericDataListInterface, GenericImageDataInterface
} from "../interfaces/DataInterfaces";
import {Api} from "../api";
import {AbstractDataList, AbstractImageData} from "../abstracts/AbstractData";
import {CampaignDataInterface} from "./CampaignData";

export interface LocationListInterface extends GenericDataListInterface{
	elements: LocationDataInterface[];
}

export interface LocationDataInterface extends GenericDataInterface, GenericImageDataInterface {
	synopsis: string;
	address: string;
}

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

	public static frontmatter = {
		'synopsis': true,
		'address': false,
	};

	constructor(
		api: Api,
		data: Record<string, any>,
		useAdditionalInformation: string|null = null,
	) {
		super(api, data);

		this.address = data.address;

		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
