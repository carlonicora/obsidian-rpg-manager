import {GenericDataInterface,
	GenericDataListInterface, GenericImageDataInterface
} from "../interfaces/DataInterfaces";
import {RpgFunctions} from "../functions/RpgFunctions";
import {AbstractDataList, AbstractImageData} from "../abstracts/AbstractData";
import {CampaignDataInterface} from "./CampaignData";

export interface CharacterListInterface extends GenericDataListInterface{
	elements: CharacterDataInterface[];
}

export interface CharacterDataInterface extends GenericDataInterface, GenericImageDataInterface {
	age: string;
	isDead: boolean;
	synopsis: string;
	goals: string|null;
}

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

	public static frontmatter = {
		'pc': {
			'dates': {
				'dob': true,
				'death': true,
			},
			'relationships': {
				'characters': true,
				'factions': true,
				'locations': true,
			},
		},
		'npc': {
			'synopsis': true,
			'goals': true,
			'dates': {
				'dob': true,
				'death': true,
			},
			'relationships': {
				'characters': true,
				'factions': true,
				'locations': true,
			},
		}
	};

	constructor(
		functions: RpgFunctions,
		data: Record<string, any>,
		public campaign: CampaignDataInterface|null,
		useAdditionalInformation: string|null = null,
	) {
		super(functions, data);

		this.age = '';
		this.image = functions.getImage(data);
		if (campaign !== null) this.age = functions.calculateAge(data, campaign.currentDate);
		this.isDead = data.dates.death != undefined;
		this.goals = data.goals != undefined ? data.goals : null;

		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
