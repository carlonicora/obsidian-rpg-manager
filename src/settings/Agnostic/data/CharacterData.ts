import {Api} from "../../../Api";
import {AbstractDataList, AbstractImageData} from "../../../abstracts/AbstractData";
import {Pronoun} from "../../../enums/Pronoun";
import {CharacterListInterface} from "../../../interfaces/data/CharacterListInterface";
import {CharacterDataInterface} from "../../../interfaces/data/CharacterDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {Factory} from "../../../Factory";

export class CharacterList extends AbstractDataList implements CharacterListInterface {
	public elements: CharacterDataInterface[];

	constructor(
		campaign: CampaignDataInterface|null,
	) {
		super(campaign);
		this.elements = [];
	}
}

export class CharacterData extends AbstractImageData implements CharacterDataInterface {
	public image: string;
	public age: string;
	public synopsis: string;
	public isDead: boolean;
	public goals: string|null;
	public pronoun: Pronoun|null;

	constructor(
		api: Api,
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		useAdditionalInformation: string|null = null,
	) {
		super(api, data);

		this.age = '';
		this.image = this.api.getImage(data);
		this.age = this.api.calculateAge(data, campaign.currentDate);
		this.isDead = data.dates.death != undefined;
		this.goals = data.goals != undefined ? data.goals : null;
		this.pronoun = Factory.createPronoun(data.pronoun);

		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
