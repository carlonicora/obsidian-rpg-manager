import {AbstractDataList} from "../../../abstracts/AbstractData";
import {CharacterListInterface} from "../../../interfaces/data/CharacterListInterface";
import {CharacterDataInterface} from "../../../interfaces/data/CharacterDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";

export class CharacterList extends AbstractDataList implements CharacterListInterface {
	public elements: CharacterDataInterface[];

	constructor(
		campaign: CampaignDataInterface,
	) {
		super(campaign);
		this.elements = [];
	}
}
