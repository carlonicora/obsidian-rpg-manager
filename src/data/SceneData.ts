import {GenericDataInterface, GenericDataListInterface, GenericImageDataInterface} from "../interfaces/DataInterfaces";
import {Api} from "../api";
import {AbstractDataList, AbstractImageData} from "../abstracts/AbstractData";
import {CampaignDataInterface} from "./CampaignData";
import {SessionDataInterface} from "./SessionData";
import {AdventureDataInterface} from "./AdventureData";
import {DataType} from "../io/IoData";

export interface SceneListInterface extends GenericDataListInterface{
	elements: SceneDataInterface[];
}

export interface SceneDataInterface extends GenericDataInterface, GenericImageDataInterface {
	synopsis: string;
	action: string;
	sessionId: number;
	adventureId: number;
	id: number;
	startTime: string;
	endTime: string;
	duration: string;
	session: SessionDataInterface|null;
	adventure: AdventureDataInterface|null;
	previousScene: SceneDataInterface|null;
	nextScene: SceneDataInterface|null;
	campaign: CampaignDataInterface;
}

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

	public static frontmatter = {
		'synopsis': true,
		'action': true,
		'ids': {
			'session': true,
			'scene': true,
		},
		'relationships': {
			'characters': true,
			'clues': true,
			'locations': true,
		},
		'time': {
			'start': false,
			'end': false,
		}
	};

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
