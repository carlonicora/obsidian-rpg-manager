import {ClueDataInterface} from "../../../interfaces/data/ClueDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {RpgFunctions} from "../../../RpgFunctions";
import {AbstractImageData} from "../../../abstracts/AbstractImageData";

export class ClueData extends AbstractImageData implements ClueDataInterface {
	public found: string|boolean;
	public synopsis: string;

	constructor(
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		useAdditionalInformation: string|null = null,
	) {
		super(data);

		this.image = RpgFunctions.getImage(data);
		if (data.dates.found !== null && data.dates.found !== undefined && data.dates.found !== false){
			this.found = RpgFunctions.formatDate(data.dates.found, "long");
		} else {
			this.found = false;
		}
		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
