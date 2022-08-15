import {GenericDataInterface,
	GenericDataListInterface, GenericImageDataInterface
} from "../interfaces/DataInterfaces";
import {Api} from "../api";
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
		api: Api,
		data: Record<string, any>,
		public campaign: CampaignDataInterface|null,
		useAdditionalInformation: string|null = null,
	) {
		super(api, data);

		this.age = '';
		this.image = this.api.getImage(data);
		if (campaign !== null) this.age = this.api.calculateAge(data, campaign.currentDate);
		this.isDead = data.dates.death != undefined;
		this.goals = data.goals != undefined ? data.goals : null;

		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
