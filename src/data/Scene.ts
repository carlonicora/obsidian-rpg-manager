import {AbstractOutlineData} from "../abstracts/database/AbstractOutlineData";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {DataType} from "../enums/DataType";

export class Scene extends AbstractOutlineData implements SceneInterface {
	public sceneId: number;
	public action: string | null;
	public startTime: Date | null;
	public endTime: Date | null;

	public adventure: AdventureInterface;
	public session: SessionInterface;
	public previousScene: SceneInterface | null = null;
	public nextScene: SceneInterface | null = null;

	protected loadData(
	): void {
		this.sceneId = this.app.plugins.getPlugin('rpg-manager').tagManager.getId(this.type, this.tag);
		this.startTime = this.initialiseDate(this.frontmatter?.time?.start);
		this.endTime = this.initialiseDate(this.frontmatter?.time?.end);
		this.action = this.frontmatter?.action;

		super.loadData();
	}

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		super.loadHierarchy(database);

		this.adventure = database.readSingle<AdventureInterface>(database, DataType.Adventure, this.tag);
		this.session = database.readSingle<SessionInterface>(database, DataType.Session, this.tag);

		try {
			this.previousScene = database.readSingle<SceneInterface>(database, DataType.Scene, this.tag, this.sceneId - 1);
			this.previousScene.nextScene = this;
		} catch (e) {
			//ignore. It can be non existing
		}

		try {
			this.nextScene = database.readSingle<SceneInterface>(database, DataType.Scene, this.tag, this.sceneId + 1);
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
