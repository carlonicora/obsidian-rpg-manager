import {AbstractComponentOutline} from "../abstracts/AbstractComponentOutline";
import {SceneInterface} from "../interfaces/components/SceneInterface";
import {AdventureInterface} from "../interfaces/components/AdventureInterface";
import {ActInterface} from "../interfaces/components/ActInterface";
import {DatabaseInterface} from "../interfaces/database/DatabaseInterface";
import {ComponentType} from "../enums/ComponentType";
import {FrontMatterCache} from "obsidian";
import {TagMisconfiguredError} from "../errors/TagMisconfiguredError";
import {SessionInterface} from "../interfaces/components/SessionInterface";
import {StoryCircleStage} from "../enums/StoryCircleStage";
import {SceneType} from "../enums/SceneType";

export class Scene extends AbstractComponentOutline implements SceneInterface {
	public sceneId: number;
	public sessionId: number|undefined;
	public action: string|null;
	public startTime: Date|null;
	public endTime: Date|null;
	public date: Date|null;

	public adventure: AdventureInterface;
	public session: SessionInterface|undefined=undefined;
	public act: ActInterface;
	public previousScene: SceneInterface | null = null;
	public nextScene: SceneInterface | null = null;

	public storycircleStage: StoryCircleStage|undefined=undefined;
	public sceneType: SceneType|undefined=undefined;
	public isActedUpon: boolean|undefined=undefined;

	public currentDuration = 0;
	private durationStints: Array<string> = [];

	private activeSceneTypes: Map<SceneType, boolean> = new Map<SceneType, boolean>([
		[SceneType.Combat, true],
		[SceneType.Decision, false],
		[SceneType.Encounter, true],
		[SceneType.Exposition, false],
		[SceneType.Planning, false],
		[SceneType.Preparation, true],
		[SceneType.Recap, false],
		[SceneType.Investigation, true],
		[SceneType.Action, true],
	]);

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
		this.date = frontmatter?.date !== undefined ? this.initialiseDate(frontmatter.date) : null;
		this.startTime = this.initialiseDate(frontmatter?.times?.start ?? frontmatter?.time?.start);
		this.endTime = this.initialiseDate(frontmatter?.times?.end ?? frontmatter?.time?.end);
		this.action = frontmatter?.action;

		if (frontmatter?.storycircle !== undefined) this.storycircleStage = StoryCircleStage[frontmatter.storycircle as keyof typeof StoryCircleStage];
		if (frontmatter?.sceneType !== undefined) this.sceneType = SceneType[frontmatter.sceneType as keyof typeof SceneType];
		if (frontmatter?.isActedUpon !== undefined) this.isActedUpon = frontmatter.isActedUpon;

		this.additionalInformation

		super.initialiseData(frontmatter);
	}

	protected analyseMetadata(
	): void {
		super.analyseMetadata();

		if (this.metadata.duration !== undefined) this.currentDuration = this.metadata.duration;

		if (this.metadata.durations !== undefined) this.durationStints = this.metadata.durations;
	}

	public async loadHierarchy(
		database: DatabaseInterface,
	): Promise<void> {
		await super.loadHierarchy(database);

		this.adventure = database.readSingle<AdventureInterface>(ComponentType.Adventure, this.id);
		this.act = database.readSingle<ActInterface>(ComponentType.Act, this.id);
		this.parent = this.act;

		if (this.sessionId !== undefined && this.sessionId !== null) {
			const sessions = await database.read<SessionInterface>(
				(data: SessionInterface) =>
					data.id.type === ComponentType.Session &&
					data.id.campaignId === this.campaign.campaignId &&
					data.id.sessionId === this.sessionId
			);
			if (sessions.length === 1) this.session = sessions[0];
		}

		try {
			this.previousScene = database.readSingle<SceneInterface>(ComponentType.Scene, this.id, this.sceneId - 1);
			this.previousScene.nextScene = this;
		} catch (e) {
			//ignore. It can be non existing
		}

		try {
			this.nextScene = database.readSingle<SceneInterface>(ComponentType.Scene, this.id, this.sceneId + 1);
			this.nextScene.previousScene = this;
		} catch (e) {
			//ignore. It can be non existing
		}
	}

	public get duration(
	): string {
		if (this.currentDuration === 0) return '00:00';

		const hours: number = Math.floor(this.currentDuration / (60 * 60));
		const minutes: number = Math.floor((this.currentDuration - (hours * 60 * 60))/60);
		return (hours < 10 ? '0' + hours.toString() : hours.toString()) +
			':' +
			(minutes < 10 ? '0' + minutes.toString() : minutes.toString());
	}

	public get isActive(
	): boolean {
		if (this.sceneType === undefined) return false;

		return this.activeSceneTypes.get(this.sceneType) ?? false;
	}

	public get expectedDuration(
	): number {
		if (this.sceneType === undefined) return 0;

		const previousDurations: Array<number> = this.factories.runningTimeManager.medianTimes.get(this.id.campaignId)?.get(this.sceneType) ?? [];
		previousDurations.sort((left: number, right: number) => {
			if (left > right) return +1;
			if (left < right) return -1;
			return 0;
		});

		if (previousDurations.length === 0) return 0;
		if (previousDurations.length === 1) return previousDurations[0];

		if (previousDurations.length % 2 === 0){
			const previous = previousDurations[previousDurations.length/2];
			const next = previousDurations[(previousDurations.length/2)-1];
			return Math.floor((previous+next)/2);
		} else {
			return previousDurations[(previousDurations.length-1)/2];
		}
	}

	public get isExciting(
	): boolean {
		if (this.isActedUpon === undefined) return false;

		return this.isActedUpon;
	}

	public get isCurrentlyRunning(
	): boolean {
		for (let index=0; index<this.durationStints.length; index++) {
			if (this.durationStints[index].indexOf('-') === -1) return true;
		}

		return false;
	}

	public get lastStart(
	): number {
		if (!this.isCurrentlyRunning) return 0;

		for (let index=0; index<this.durationStints.length; index++) {
			if (this.durationStints[index].indexOf('-') === -1) return +this.durationStints[index];
		}

		return 0;
	}
}
