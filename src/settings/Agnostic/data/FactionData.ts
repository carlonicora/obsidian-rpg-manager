import {FactionDataInterface} from "../../../interfaces/data/FactionDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {AbstractImageData} from "../../../abstracts/AbstractImageData";

export class FactionData extends AbstractImageData implements FactionDataInterface {
	public synopsis: string;

	constructor(
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		useAdditionalInformation: string|null = null,
	) {
		super(data);

		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
