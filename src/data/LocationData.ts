import {GenericDataInterface,
	GenericDataListInterface, GenericImageDataInterface
} from "../interfaces/DataInterfaces";
import {RpgFunctions} from "../functions/RpgFunctions";
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

	constructor(
		functions: RpgFunctions,
		data: Record<string, any>,
		useAdditionalInformation: string|null = null,
	) {
		super(functions, data);

		this.address = data.address;

		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
