import {
	GenericDataInterface,
	GenericDataListInterface, GenericImageDataInterface
} from "../interfaces/DataInterfaces";
import {Api} from "../api";
import {AbstractDataList, AbstractImageData} from "../abstracts/AbstractData";
import {CampaignDataInterface} from "./CampaignData";

export interface ClueListInterface extends GenericDataListInterface{
	elements: ClueDataInterface[];
}

export interface ClueDataInterface extends GenericDataInterface, GenericImageDataInterface {
	found: string|boolean;
	synopsis: string;
}

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

	public static frontmatter = {
		'synopsis': true,
		'dates': {
			'found': false,
		},
		'relationships': {
			'characters': true,
			'locations': true,
		},
	};

	constructor(
		api: Api,
		data: Record<string, any>,
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
