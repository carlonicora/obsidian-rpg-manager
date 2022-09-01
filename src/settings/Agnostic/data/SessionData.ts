import {Api} from "../../../Api";
import {AbstractData, AbstractDataList} from "../../../abstracts/AbstractData";
import {AdventureDataInterface} from "../../../interfaces/data/AdventureDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {DataType} from "../../../enums/DataType";
import {SessionListInterface} from "../../../interfaces/data/SessionListInterface";
import {SessionDataInterface} from "../../../interfaces/data/SessionDataInterface";

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

	constructor(
		api: Api,
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		public adventure: AdventureDataInterface|null = null,
		public previousSession: SessionDataInterface|null = null,
		public nextSession: SessionDataInterface|null = null,
	) {
		super(api, data);

		this.id = this.api.getTagId(data.tags, DataType.Session);
		this.adventureId = this.api.getTagId(data.tags, DataType.Adventure);

		this.synopsis = data.synopsis;
		if (data.dates.session !== null && data.dates.session !== undefined) this.date = this.api.formatDate(data.dates.session, "short");
		if (data.dates.irl !== null && data.dates.irl !== undefined) this.irl = this.api.formatDate(data.dates.irl);
	}
}
