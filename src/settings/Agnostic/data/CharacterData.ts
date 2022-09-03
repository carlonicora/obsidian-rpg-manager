import {Pronoun} from "../../../enums/Pronoun";
import {CharacterDataInterface} from "../../../interfaces/data/CharacterDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {RpgFunctions} from "../../../RpgFunctions";
import {PronounFactory} from "../../../factories/PronounFactory";
import {AbstractImageData} from "../../../abstracts/AbstractImageData";

export class CharacterData extends AbstractImageData implements CharacterDataInterface {
	public image: string;
	public age: string;
	public synopsis: string;
	public isDead: boolean;
	public goals: string|null;
	public pronoun: Pronoun|null;
	public dob: string|null;
	public death: string|null;

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

		if (data.dates.dob != undefined){
			this.dob = RpgFunctions.formatDate(data.dates.dob);
		}

		if (data.dates.death != undefined){
			this.death = RpgFunctions.formatDate(data.dates.death);
		}

		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
