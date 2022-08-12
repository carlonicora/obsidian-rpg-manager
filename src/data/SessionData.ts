import {GenericDataInterface, GenericDataListInterface,
} from "../interfaces/DataInterfaces";
import {RpgFunctions} from "../functions/RpgFunctions";
import {AbstractData, AbstractDataList} from "../abstracts/AbstractData";
import {CampaignDataInterface} from "./CampaignData";
import {AdventureDataInterface} from "./AdventureData";

export interface SessionListInterface extends GenericDataListInterface{
	elements: SessionDataInterface[];
}

export interface SessionDataInterface extends GenericDataInterface {
	id: number;
	adventureId: number;
	synopsis: string;
	date: string;
	irl: string;
	previousSession: SessionDataInterface|null,
	nextSession: SessionDataInterface|null;
	adventure: AdventureDataInterface|null;
	campaign: CampaignDataInterface|null;
}

export class SessionList extends AbstractDataList implements SessionListInterface {
	public elements: SessionDataInterface[];

	constructor(
		campaign: CampaignDataInterface|null,
	) {
		super(campaign);
		this.elements = [];
	}
}

export class SessionData extends AbstractData implements SessionDataInterface {
	public id: number;
	public adventureId: number;
	public synopsis: string;
	public date: string;
	public irl: string;

	public static frontmatter = {
		'synopsis': true,
		'ids': {
			'adventure': true,
			'session': true,
		},
		'dates': {
			'session': true,
			'irl': false,
		}
	};

	constructor(
		functions: RpgFunctions,
		data: Record<string, any>,
		public campaign: CampaignDataInterface|null = null,
		public adventure: AdventureDataInterface|null = null,
		public previousSession: SessionDataInterface|null = null,
		public nextSession: SessionDataInterface|null = null,
	) {
		super(functions, data);

		this.id = data.ids.session;
		this.adventureId = data.ids.adventure;
		this.synopsis = data.synopsis;
		if (data.dates.session !== null && data.dates.session !== undefined) this.date = this.functions.formatDate(data.dates.session, "short");
		if (data.dates.irl !== null && data.dates.irl !== undefined) this.date = this.functions.formatDate(data.dates.irl);
	}
}
