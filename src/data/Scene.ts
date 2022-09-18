import {AbstractOutlineRecord} from "../abstracts/database/AbstractOutlineRecord";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {DataType} from "../enums/DataType";

export class Scene extends AbstractOutlineRecord implements SceneInterface {
	public sceneId: number;
	public action: string | null;
	public startTime: Date | null;
	public endTime: Date | null;

	public adventure: AdventureInterface;
	public session: SessionInterface;
	public previousScene: SceneInterface | null = null;
	public nextScene: SceneInterface | null = null;

	protected initialiseData(
	): void {
		this.sceneId = this.id.getTypeValue(DataType.Scene);
		this.startTime = this.initialiseDate(this.frontmatter?.time?.start);
		this.endTime = this.initialiseDate(this.frontmatter?.time?.end);
		this.action = this.frontmatter?.action;

		super.initialiseData();
	}

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		super.loadHierarchy(database);

		this.adventure = database.readSingle<AdventureInterface>(DataType.Adventure, this.id.tag);
		this.session = database.readSingle<SessionInterface>(DataType.Session, this.id.tag);

		try {
			this.previousScene = database.readSingle<SceneInterface>(DataType.Scene, this.id.tag, this.sceneId - 1);
			this.previousScene.nextScene = this;
		} catch (e) {
			//ignore. It can be non existing
		}

		try {
			this.nextScene = database.readSingle<SceneInterface>(DataType.Scene, this.id.tag, this.sceneId + 1);
			this.nextScene.previousScene = this;
		} catch (e) {
			//ignore. It can be non existing
		}
	}

	public get duration(): string {
		let response = '';

		if (this.startTime && this.endTime) {
			const duration = this.endTime.getTime() - this.startTime.getTime();
			const hours = Math.floor(duration / (1000 * 60 * 60));
			const minutes = Math.floor(duration / (1000 * 60)) % 60;

			response = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
		}

		return response;
	}
}
