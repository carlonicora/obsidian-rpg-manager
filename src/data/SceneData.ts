import {GenericDataInterface,
	GenericDataListInterface, GenericImageDataInterface
} from "../interfaces/DataInterfaces";
import {RpgFunctions} from "../functions/RpgFunctions";
import {AbstractDataList, AbstractImageData} from "../abstracts/AbstractData";
import {CampaignDataInterface} from "./CampaignData";
import {SessionDataInterface} from "./SessionData";
import {AdventureDataInterface} from "./AdventureData";

export interface SceneListInterface extends GenericDataListInterface{
	elements: SceneDataInterface[];
}

export interface SceneDataInterface extends GenericDataInterface, GenericImageDataInterface {
	synopsis: string;
	sessionId: number;
	sceneId: number;
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
	public sessionId: number;
	public sceneId: number;
	public startTime: string;
	public endTime: string;
	public duration = '';

	public static frontmatter = {
		'synopsis': true,
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
		functions: RpgFunctions,
		data: Record<string, any>,
		public session: SessionDataInterface|null = null,
		public adventure: AdventureDataInterface|null = null,
		public previousScene: SceneDataInterface|null = null,
		public nextScene: SceneDataInterface|null = null,
		public campaign: CampaignDataInterface|null = null,
	) {
		super(functions, data);

		this.synopsis = data.synopsis != undefined ? data.synopsis : '';
		this.sessionId = data.ids?.session != undefined ? data.ids.session : 0;
		this.sceneId = data.ids?.scene != undefined ? data.ids.scene : 0;
		this.startTime = this.functions.formatTime(data.time.start);
		this.endTime = this.functions.formatTime(data.time.end);

		if (this.startTime !== '' && this.endTime !== ''){
			this.duration = this.functions.calculateDuration(data.time.start, data.time.end);
		}
	}
}
