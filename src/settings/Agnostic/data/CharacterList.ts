import {CharacterListInterface} from "../../../interfaces/data/CharacterListInterface";
import {CharacterDataInterface} from "../../../interfaces/data/CharacterDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {AbstractDataList} from "../../../abstracts/AbstractDataList";

export class CharacterList extends AbstractDataList implements CharacterListInterface {
	public elements: CharacterDataInterface[];

	constructor(
		campaign: CampaignDataInterface,
	) {
		super(campaign);
		this.elements = [];
	}
}
