import {GenericDataInterface, GenericImageDataInterface} from "../interfaces/DataInterfaces";
import {RpgFunctions} from "./functions/RpgFunctions";
import {AbstractImageData} from "../abstracts/AbstractData";

export interface CampaignDataInterface extends GenericDataInterface, GenericImageDataInterface {
	currentDate: string;
}

export class CampaignData extends AbstractImageData implements CampaignDataInterface {
	public currentDate: string;

	constructor(
		functions: RpgFunctions,
		data: Record<string, any>,
	) {
		super(functions, data);
		this.currentDate = data.dates.current;
	}
}
