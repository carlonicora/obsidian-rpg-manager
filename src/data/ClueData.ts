import {
	GenericDataInterface,
	GenericDataListInterface, GenericImageDataInterface
} from "../interfaces/DataInterfaces";
import {RpgFunctions} from "./functions/RpgFunctions";
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

	constructor(
		functions: RpgFunctions,
		data: Record<string, any>,
		useAdditionalInformation: string|null = null,
	) {
		super(functions, data);

		this.image = functions.getImage(data);
		if (data.dates.found !== null && data.dates.found !== undefined && data.dates.found !== false){
			this.found = functions.formatDate(data.dates.found, "long");
		} else {
			this.found = false;
		}
		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
