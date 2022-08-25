import {GenericDataInterface,
	GenericDataListInterface, GenericImageDataInterface
} from "../interfaces/DataInterfaces";
import {Api} from "../api";
import {AbstractDataList, AbstractImageData} from "../abstracts/AbstractData";
import {CampaignDataInterface} from "./CampaignData";

export enum Pronoun {
	they,
	she,
	he,
}

export class PronounFactory {
	public static create(
		pronoun: string|null,
	): Pronoun|null {

		let response: Pronoun|null = null;

		if (pronoun != null) {
			switch(pronoun.toLowerCase()) {
				case 't':
				case 'they':
					response = Pronoun.they;
					break;
				case 's':
				case 'she':
					response = Pronoun.she;
					break;
				case 'h':
				case 'he':
					response = Pronoun.he;
					break;
				default:
					response = null;
					break;
			}
		}

		return response;
	}

	public static read(
		pronoun: Pronoun
	): string {
		switch (pronoun) {
			case Pronoun.they:
				return 'They/Them';
				break;
			case Pronoun.she:
				return 'She/Her';
				break;
			case Pronoun.he:
				return 'He/Him';
				break;
		}
	}
}

export interface CharacterListInterface extends GenericDataListInterface{
	elements: CharacterDataInterface[];
}

export interface CharacterDataInterface extends GenericDataInterface, GenericImageDataInterface {
	age: string;
	isDead: boolean;
	synopsis: string;
	goals: string|null;
	pronoun: Pronoun|null;
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
	public pronoun: Pronoun|null;

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
		public campaign: CampaignDataInterface,
		useAdditionalInformation: string|null = null,
	) {
		super(api, data);

		this.age = '';
		this.image = this.api.getImage(data);
		this.age = this.api.calculateAge(data, campaign.currentDate);
		this.isDead = data.dates.death != undefined;
		this.goals = data.goals != undefined ? data.goals : null;
		this.pronoun = PronounFactory.create(data.pronoun);

		this.synopsis = useAdditionalInformation !== null ? useAdditionalInformation : data.synopsis;
	}
}
