import {Api} from "../../../Api";
import {AbstractDataList, AbstractImageData} from "../../../abstracts/AbstractData";
import {FactionListInterface} from "../../../interfaces/data/FactionListInterface";
import {FactionDataInterface} from "../../../interfaces/data/FactionDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";

export class FactionList extends AbstractDataList implements FactionListInterface {
	public elements: FactionDataInterface[];

	constructor(
		campaign: CampaignDataInterface|null,
	) {
		super(campaign);
		this.elements = [];
	}
}

export class FactionData extends AbstractImageData implements FactionDataInterface {
	public synopsis: string;

	constructor(
		api: Api,
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		useAdditionalInformation: string|null = null,
	) {
		super(api, data);

		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
