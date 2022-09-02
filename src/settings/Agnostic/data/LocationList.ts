import {LocationListInterface} from "../../../interfaces/data/LocationListInterface";
import {LocationDataInterface} from "../../../interfaces/data/LocationDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {AbstractDataList} from "../../../abstracts/AbstractDataList";

export class LocationList extends AbstractDataList implements LocationListInterface {
	public elements: LocationDataInterface[];

	constructor(
		campaign: CampaignDataInterface,
	) {
		super(campaign);
		this.elements = [];
	}
}
