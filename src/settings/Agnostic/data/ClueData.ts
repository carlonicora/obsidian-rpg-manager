import {Api} from "../../../Api";
import {AbstractDataList, AbstractImageData} from "../../../abstracts/AbstractData";
import {ClueListInterface} from "../../../interfaces/data/ClueListInterface";
import {ClueDataInterface} from "../../../interfaces/data/ClueDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";

export class ClueList extends AbstractDataList implements ClueListInterface {
	public elements: ClueDataInterface[];

	constructor(
		campaign: CampaignDataInterface|null,
	) {
		super(campaign);
		this.elements = [];
	}
}

export class ClueData extends AbstractImageData implements ClueDataInterface {
	public found: string|boolean;
	public synopsis: string;

	constructor(
		api: Api,
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		useAdditionalInformation: string|null = null,
	) {
		super(api, data);

		this.image = this.api.getImage(data);
		if (data.dates.found !== null && data.dates.found !== undefined && data.dates.found !== false){
			this.found = this.api.formatDate(data.dates.found, "long");
		} else {
			this.found = false;
		}
		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
