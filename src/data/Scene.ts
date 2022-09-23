import {AbstractOutlineRecord} from "../abstracts/AbstractOutlineRecord";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {AdventureInterface} from "../interfaces/data/AdventureInterface";
import {ActInterface} from "../interfaces/data/ActInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {RecordType} from "../enums/RecordType";
import {FrontMatterCache} from "obsidian";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {StoryCircleStage} from "../enums/StoryCircleStage";

export class Scene extends AbstractOutlineRecord implements SceneInterface {
	public sceneId: number;
	public sessionId: number|undefined;
	public action: string|null;
	public startTime: Date|null;
	public endTime: Date|null;

	public adventure: AdventureInterface;
	public session: SessionInterface|undefined=undefined;
	public act: ActInterface;
	public previousScene: SceneInterface | null = null;
	public nextScene: SceneInterface | null = null;
	public storycircleStage: StoryCircleStage|undefined=undefined;

	protected initialiseData(
		frontmatter: FrontMatterCache|undefined,
	): void {
		const sceneId = this.id.sceneId;
		if (sceneId === undefined) throw new TagMisconfiguredError(this.app, this.id);

		this.sceneId = sceneId;
		if (frontmatter?.session !== undefined && frontmatter.session !== null) {
			this.sessionId = frontmatter.session;
		} else {
			this.sessionId = undefined;
		}
		this.startTime = this.initialiseDate(frontmatter?.times?.start ?? frontmatter?.time?.start);
		this.endTime = this.initialiseDate(frontmatter?.times?.end ?? frontmatter?.time?.end);
		this.action = frontmatter?.action;

		if (frontmatter?.storycircle !== undefined){
			this.storycircleStage = StoryCircleStage[frontmatter.storycircle as keyof typeof StoryCircleStage];
		}

		super.initialiseData(frontmatter);
	}

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		await super.loadHierarchy(database);

		this.adventure = database.readSingle<AdventureInterface>(RecordType.Adventure, this.id);
		this.act = database.readSingle<ActInterface>(RecordType.Act, this.id);

		if (this.sessionId !== undefined && this.sessionId !== null) {
			const sessions = await database.read<SessionInterface>(
				(data: SessionInterface) =>
					data.id.type === RecordType.Session &&
					data.id.campaignId === this.campaign.campaignId &&
					data.id.sessionId === this.sessionId
			);
			if (sessions.length === 1) this.session = sessions[0];
		}

		try {
			this.previousScene = database.readSingle<SceneInterface>(RecordType.Scene, this.id, this.sceneId - 1);
			this.previousScene.nextScene = this;
		} catch (e) {
			//ignore. It can be non existing
		}

		try {
			this.nextScene = database.readSingle<SceneInterface>(RecordType.Scene, this.id, this.sceneId + 1);
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
