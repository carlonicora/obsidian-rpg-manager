import {CampaignDataInterface} from "../../../interfaces/data/CampaignDataInterface";
import {AdventureDataInterface} from "../../../interfaces/data/AdventureDataInterface";
import {SceneDataInterface} from "../../../interfaces/data/SceneDataInterface";
import {DataType} from "../../../enums/DataType";
import {SessionDataInterface} from "../../../interfaces/data/SessionDataInterface";
import {RpgFunctions} from "../../../RpgFunctions";
import {AbstractImageData} from "../../../abstracts/AbstractImageData";

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
		data: Record<string, any>,
		public campaign: CampaignDataInterface,
		additionalInformation: string|null,
		public adventure: AdventureDataInterface|null = null,
		public session: SessionDataInterface|null = null,
		public previousScene: SceneDataInterface|null = null,
		public nextScene: SceneDataInterface|null = null,
	) {
		super(data);

		this.action = data.action != undefined ? data.action : '';
		this.synopsis = data.synopsis != undefined ? data.synopsis : '';
		this.startTime = RpgFunctions.formatTime(data.time?.start);
		this.endTime = RpgFunctions.formatTime(data.time?.end);

		this.id = RpgFunctions.getTagId(data.tags, DataType.Scene);
		this.sessionId = RpgFunctions.getTagId(data.tags, DataType.Session);
		this.adventureId = RpgFunctions.getTagId(data.tags, DataType.Adventure);

		if (this.startTime !== '' && this.endTime !== ''){
			this.duration = RpgFunctions.calculateDuration(data.time.start, data.time.end);
		}
	}
}
