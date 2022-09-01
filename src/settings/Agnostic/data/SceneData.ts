import {Api} from "../../../Api";
import {AbstractDataList, AbstractImageData} from "../../../abstracts/AbstractData";
import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {AdventureDataInterface} from "../../../interfaces/data/AdventureDataInterface";
import {SceneDataInterface} from "../../../interfaces/data/SceneDataInterface";
import {SceneListInterface} from "../../../interfaces/data/SceneListInterface";
import {DataType} from "../../../enums/DataType";
import {SessionDataInterface} from "../../../interfaces/data/SessionDataInterface";

export class SceneList extends AbstractDataList implements SceneListInterface {
	public elements: SceneDataInterface[];

	constructor(
		campaign: CampaignDataInterface|null,
	) {
		super(campaign);
		this.elements = [];
	}
}

export class SceneData extends AbstractImageData implements SceneDataInterface {
	public synopsis: string;
	public action: string;
	public id: number;
	public sessionId: number;
	public adventureId: number;
	public startTime: string;
	public endTime: string;
	public duration = '';

	constructor(
		api: Api,
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		public adventure: AdventureDataInterface|null = null,
		public session: SessionDataInterface|null = null,
		public previousScene: SceneDataInterface|null = null,
		public nextScene: SceneDataInterface|null = null,
	) {
		super(api, data);

		this.action = data.action != undefined ? data.action : '';
		this.synopsis = data.synopsis != undefined ? data.synopsis : '';
		this.startTime = this.api.formatTime(data.time?.start);
		this.endTime = this.api.formatTime(data.time?.end);

		this.id = this.api.getTagId(data.tags, DataType.Scene);
		this.sessionId = this.api.getTagId(data.tags, DataType.Session);
		this.adventureId = this.api.getTagId(data.tags, DataType.Adventure);

		if (this.startTime !== '' && this.endTime !== ''){
			this.duration = this.api.calculateDuration(data.time.start, data.time.end);
		}
	}
}
