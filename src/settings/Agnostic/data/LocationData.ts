import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {LocationDataInterface} from "../../../interfaces/data/LocationDataInterface";
import {AbstractImageData} from "../../../abstracts/AbstractImageData";

export class LocationData extends AbstractImageData implements LocationDataInterface {
	synopsis: string;
	address: string;

	constructor(
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		useAdditionalInformation: string|null = null,
	) {
		super(data);

		this.address = data.address;

		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
