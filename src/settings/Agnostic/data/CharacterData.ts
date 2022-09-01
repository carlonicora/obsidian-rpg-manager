import {AbstractImageData} from "../../../abstracts/AbstractData";
import {Pronoun} from "../../../enums/Pronoun";
import {CharacterDataInterface} from "../../../interfaces/data/CharacterDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {RpgFunctions} from "../../../RpgFunctions";
import {PronounFactory} from "../../../factories/PronounFactory";

export class CharacterData extends AbstractImageData implements CharacterDataInterface {
	public image: string;
	public age: string;
	public synopsis: string;
	public isDead: boolean;
	public goals: string|null;
	public pronoun: Pronoun|null;

	constructor(
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		useAdditionalInformation: string|null = null,
	) {
		super(data);

		this.age = '';
		this.image = RpgFunctions.getImage(data);
		this.age = RpgFunctions.calculateAge(data, campaign.currentDate);
		this.isDead = data.dates.death != undefined;
		this.goals = data.goals != undefined ? data.goals : null;
		this.pronoun = PronounFactory.create(data.pronoun);

		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
