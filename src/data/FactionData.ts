import {GenericDataInterface,
	GenericDataListInterface, GenericImageDataInterface
} from "../interfaces/DataInterfaces";
import {RpgFunctions} from "../functions/RpgFunctions";
import {AbstractDataList, AbstractImageData} from "../abstracts/AbstractData";
import {CampaignDataInterface} from "./CampaignData";

export interface FactionListInterface extends GenericDataListInterface{
	elements: FactionDataInterface[];
}

export interface FactionDataInterface extends GenericDataInterface, GenericImageDataInterface {
	synopsis: string;
}

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

	public static frontmatter = {
		'synopsis': true,
		'relationships': {
			'locations': true,
		},
	};

	constructor(
		functions: RpgFunctions,
		data: Record<string, any>,
		public campaign: CampaignDataInterface|null,
		useAdditionalInformation: string|null = null,
	) {
		super(functions, data);

		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
