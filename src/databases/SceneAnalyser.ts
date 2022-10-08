import {App} from "obsidian";
import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {ComponentType} from "./enums/ComponentType";
import {IdInterface} from "./interfaces/IdInterface";
import {AbtStage} from "../plots/enums/AbtStage";
import {SceneType} from "./enums/SceneType";
import {SorterComparisonElement} from "./SorterComparisonElement";
import {SceneInterface} from "./components/interfaces/SceneInterface";
import {SessionInterface} from "./components/interfaces/SessionInterface";

export enum ThresholdResult {
	NotAnalysable,
	CriticallyHigh,
	High,
	Correct,
	Low,
	CriticallyLow,
}

export class SceneAnalyser extends AbstractRpgManager {
	private excitmentPercentage: number|undefined = undefined;
	private activityPercentage: number|undefined = undefined;
	private activeScenes=0;
	public parentType: ComponentType;
	public expectedRunningTime=0;
	public actualRunningTime=0;
	public isSingleScene=false;
	private expectedExcitementDuration=0;
	private sceneTypesUsed: Map<SceneType, number> = new Map<SceneType, number>();
	private repetitiveScenes = 0;
	public scenesCount = 0;
	public targetDuration: number|undefined = undefined;

	private abtStageExcitementThreshold: Map<AbtStage, number> = new Map<AbtStage, number>([
		[AbtStage.Need, 35],
		[AbtStage.And, 35],
		[AbtStage.But, 75],
		[AbtStage.Therefore, 50],
	]);

	private abtStageActivityThreshold: Map<AbtStage, number> = new Map<AbtStage, number>([
		[AbtStage.Need, 35],
		[AbtStage.And, 75],
		[AbtStage.But, 50],
		[AbtStage.Therefore, 75],
	]);

	constructor(
		app: App,
		private abtStage: AbtStage|undefined,
		private parentId: IdInterface,
	) {
		super(app);

		this.parentType = this.parentId.type;

		const scenes = this.scenes;

		this.scenesCount = scenes.length;

		if (scenes.length > 0) {
			let previousType: SceneType|undefined = undefined;
			scenes.forEach((scene: SceneInterface) => {
				this.actualRunningTime += scene.currentDuration;
				if (scene.isExciting) this.expectedExcitementDuration += scene.expectedDuration;
				if (scene.isActive) this.activeScenes++;

				if (scene.sceneType !== undefined){
					this.sceneTypesUsed.set(scene.sceneType, (this.sceneTypesUsed.get(scene.sceneType) ?? 0) + 1);
					if (previousType === scene.sceneType) {
						this.repetitiveScenes++;
					} else {
						previousType = scene.sceneType;
					}
				}

				this.expectedRunningTime += scene.expectedDuration;
			});

			this.excitmentPercentage = this.expectedExcitementDuration * 100 / this.expectedRunningTime;
			this.activityPercentage = this.activeScenes * 100 / scenes.length;
		}
	}

	private get scenes(
	): Array<SceneInterface> {
		if (this.parentId.type === ComponentType.Session) {

			try {
				const session: SessionInterface = this.database.readSingle<SessionInterface>(ComponentType.Session, this.parentId);
				if (session.targetDuration != undefined) this.targetDuration = session.targetDuration;
			} catch (e) {
			}

			return this.database.read<SceneInterface>(
				(scene: SceneInterface) =>
					scene.id.type === ComponentType.Scene &&
					scene.id.campaignId === this.parentId.campaignId &&
					scene.session?.id.sessionId === this.parentId.sessionId,
			).sort(
				this.factories.sorter.create<SceneInterface>([
					new SorterComparisonElement((scene: SceneInterface) => scene.id.campaignId),
					new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
					new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
					new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
				]));
		}

		if (this.parentId.type === ComponentType.Scene) {
			this.isSingleScene = true;
			return [this.database.readSingle<SceneInterface>(ComponentType.Scene, this.parentId)]
		}

		return this.database.readList<SceneInterface>(ComponentType.Scene, this.parentId)
			.sort(
				this.factories.sorter.create<SceneInterface>([
					new SorterComparisonElement((scene: SceneInterface) => scene.id.campaignId),
					new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
					new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
					new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
				]));
	}

	public get excitementLevel(
	):ThresholdResult {
		let expectedThreshold: number|undefined = undefined;
		if (this.abtStage === undefined){
			expectedThreshold = 50;
		} else {
			expectedThreshold = this.abtStageExcitementThreshold.get(this.abtStage);
		}

		if (expectedThreshold === undefined || this.excitmentPercentage === undefined) return ThresholdResult.NotAnalysable;

		if (this.excitmentPercentage > (expectedThreshold + 25)) return ThresholdResult.CriticallyHigh;
		if (this.excitmentPercentage > (expectedThreshold + 10)) return ThresholdResult.High;
		if (this.excitmentPercentage < (expectedThreshold - 25)) return ThresholdResult.CriticallyLow;
		if (this.excitmentPercentage < (expectedThreshold - 10)) return ThresholdResult.Low;

		return ThresholdResult.Correct;
	}

	public get activityLevel(
	):ThresholdResult {
		let expectedThreshold: number|undefined = undefined;
		if (this.abtStage === undefined){
			expectedThreshold = 50;
		} else {
			expectedThreshold = this.abtStageActivityThreshold.get(this.abtStage);
		}

		if (expectedThreshold === undefined || this.activityPercentage === undefined) return ThresholdResult.NotAnalysable;

		if (this.activityPercentage > expectedThreshold + 25) return ThresholdResult.CriticallyHigh;
		if (this.activityPercentage > expectedThreshold + 10) return ThresholdResult.High;
		if (this.activityPercentage < expectedThreshold - 25) return ThresholdResult.CriticallyLow;
		if (this.activityPercentage < expectedThreshold - 10) return ThresholdResult.Low;

		return ThresholdResult.Correct;
	}

	public get excitingScenePercentage(
	): number {
		if (this.excitmentPercentage === undefined) return 0;

		return Math.trunc(this.excitmentPercentage);
	}

	public get activeScenePercentage(
	): number {
		if (this.activityPercentage === undefined) return 0;

		return Math.trunc(this.activityPercentage);
	}

	public get targetExcitingScenePercentage(
	): number {
		let response: number|undefined = undefined;
		if (this.abtStage === undefined){
			response = 50;
		} else {
			response = this.abtStageExcitementThreshold.get(this.abtStage);
		}

		return response ?? 0;
	}

	public get targetActiveScenePercentage(
	): number {
		let response: number|undefined = undefined;
		if (this.abtStage === undefined){
			response = 50;
		} else {
			response = this.abtStageActivityThreshold.get(this.abtStage);
		}

		return response ?? 0;
	}

	public get varietyLevel(
	): ThresholdResult {
		if (this.sceneTypesUsed.size < 4) return ThresholdResult.CriticallyLow;
		if (this.sceneTypesUsed.size < 6) return ThresholdResult.Low;
		return ThresholdResult.Correct;
	}

	public get varietyCount(
	): number {
		return this.sceneTypesUsed.size;
	}

	public get boredomLevel(
	): ThresholdResult {
		if (this.repetitiveScenes >= (this.scenesCount / 2)) return ThresholdResult.CriticallyHigh;
		if (this.repetitiveScenes >= (this.scenesCount / 3)) return ThresholdResult.High;

		return ThresholdResult.Correct;
	}

	public get targetDurationLevel(
	): ThresholdResult {
		if (this.targetDuration === undefined || this.expectedRunningTime == undefined) return ThresholdResult.NotAnalysable;

		const differenceStep = this.targetDuration /10;
		const expectedRunningTime = Math.floor(this.expectedRunningTime/60);

		if (expectedRunningTime > this.targetDuration + differenceStep * 3) return  ThresholdResult.CriticallyHigh;
		if (expectedRunningTime > this.targetDuration + differenceStep * 1) return ThresholdResult.High;
		if (expectedRunningTime < this.targetDuration - differenceStep * 3) return  ThresholdResult.CriticallyLow;
		if (expectedRunningTime < this.targetDuration - differenceStep * 1) return ThresholdResult.Low;
		return ThresholdResult.Correct;
	}

	public get durationScenePercentage(
	): number {
		if (this.targetDuration === undefined || this.expectedRunningTime == undefined) return 0;

		const expectedRunningTime = Math.floor(this.expectedRunningTime/60);
		const difference = Math.abs(this.targetDuration-expectedRunningTime);

		return Math.trunc(difference/this.targetDuration*100);
	}

	public get boredomAmount(
	): number {
		return this.repetitiveScenes;
	}

	public get boredomReference(
	): number {
		return this.scenesCount;
	}

	public calculateScore(
	): number {
		let response = 0;

		let maxLevel = 100;
		if (this.targetDuration !== undefined) {
			maxLevel += 25;
			response += this._calculateThresholdScore(this.targetDurationLevel);
		}

		response += this._calculateThresholdScore(this.activityLevel)
		response += this._calculateThresholdScore(this.excitementLevel)
		response += this._calculateThresholdScore(this.varietyLevel)
		response += this._calculateThresholdScore(this.boredomLevel)

		return Math.floor(response*100/maxLevel);
	}

	private _calculateThresholdScore(
		threshold: ThresholdResult,
	): number {
		switch (threshold){
			case ThresholdResult.Correct:
				return 25;
			case ThresholdResult.CriticallyHigh:
			case ThresholdResult.CriticallyLow:
				return 5;
			case ThresholdResult.High:
			case ThresholdResult.Low:
				return 15;
		}
		return 0;
	}
}
