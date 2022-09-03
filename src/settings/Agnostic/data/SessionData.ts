import {AbstractData} from "../../../abstracts/AbstractData";
import {AdventureDataInterface} from "../../../interfaces/data/AdventureDataInterface";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {DataType} from "../../../enums/DataType";
import {SessionDataInterface} from "../../../interfaces/data/SessionDataInterface";
import {RpgFunctions} from "../../../RpgFunctions";

export class SessionData extends AbstractData implements SessionDataInterface {
	public id: number;
	public adventureId: number;
	public synopsis: string;
	public date: string;
	public irl: string;

	constructor(
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		public additionalInformation: string|null = '',
		public adventure: AdventureDataInterface|null = null,
		public previousSession: SessionDataInterface|null = null,
		public nextSession: SessionDataInterface|null = null,
	) {
		super(data);

		this.id = RpgFunctions.getTagId(data.tags, DataType.Session);
		this.adventureId = RpgFunctions.getTagId(data.tags, DataType.Adventure);

		this.synopsis = data.synopsis;
		if (data.dates.session !== null && data.dates.session !== undefined) this.date = RpgFunctions.formatDate(data.dates.session, "short");
		if (data.dates.irl !== null && data.dates.irl !== undefined) this.irl = RpgFunctions.formatDate(data.dates.irl);
	}
}
