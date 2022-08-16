import {GenericDataInterface,
	GenericDataListInterface, GenericImageDataInterface
} from "../interfaces/DataInterfaces";
import {Api} from "../api";
import {AbstractDataList, AbstractImageData} from "../abstracts/AbstractData";
import {CampaignDataInterface} from "./CampaignData";
import {SessionDataInterface} from "./SessionData";
import {AdventureDataInterface} from "./AdventureData";

export interface SceneListInterface extends GenericDataListInterface{
	elements: SceneDataInterface[];
}

export interface SceneDataInterface extends GenericDataInterface, GenericImageDataInterface {
	synopsis: string;
	action: string;
	sessionId: number;
	id: number;
	startTime: string;
	endTime: string;
	duration: string;
	session: SessionDataInterface|null;
	adventure: AdventureDataInterface|null;
	previousScene: SceneDataInterface|null;
	nextScene: SceneDataInterface|null;
	campaign: CampaignDataInterface|null;
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
	public sessionId: number;
	public id: number;
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
		public session: SessionDataInterface|null = null,
		public adventure: AdventureDataInterface|null = null,
		public previousScene: SceneDataInterface|null = null,
		public nextScene: SceneDataInterface|null = null,
		public campaign: CampaignDataInterface|null = null,
	) {
		super(api, data);

		this.action = data.action != undefined ? data.action : '';
		this.synopsis = data.synopsis != undefined ? data.synopsis : '';
		this.sessionId = data.ids?.session != undefined ? data.ids.session : 0;
		this.sessionId = this.api.getParentId(data.tags, this.api.settings.sceneTag);
		this.startTime = this.api.formatTime(data.time?.start);
		this.endTime = this.api.formatTime(data.time?.end);

		if (this.startTime !== '' && this.endTime !== ''){
			this.duration = this.api.calculateDuration(data.time.start, data.time.end);
		}
	}
}
