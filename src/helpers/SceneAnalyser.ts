import {App} from "obsidian";
import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {SceneInterface} from "../interfaces/components/SceneInterface";
import {ComponentType} from "../enums/ComponentType";
import {IdInterface} from "../interfaces/components/IdInterface";
import {AbtStage} from "../enums/AbtStage";

export enum ThresholdResult {
	Lower,
	Correct,
	Higher,
	CriticallyLow,
	NotAnalysable,
}

export class SceneAnalyser extends AbstractRpgManager{
	private excitmentPercentage: number|undefined = undefined;
	private activityPercentage: number|undefined = undefined;
	private excitingScenes=0;
	private activeScenes=0;
	public parentType: ComponentType;

	private abtStageExcitementThreshold: Map<AbtStage, number> = new Map<AbtStage, number>([
		[AbtStage.Need, 25],
		[AbtStage.And, 25],
		[AbtStage.But, 75],
		[AbtStage.Therefore, 50],
	]);

	private abtStageActivityThreshold: Map<AbtStage, number> = new Map<AbtStage, number>([
		[AbtStage.Need, 25],
		[AbtStage.And, 75],
		[AbtStage.But, 50],
		[AbtStage.Therefore, 75],
	]);

	constructor(
		app: App,
		private abtStage: AbtStage,
		private parentId: IdInterface,
	) {
		super(app);

		this.parentType = this.parentId.type;

		const scenes = this.scenes;

		if (scenes.length > 0) {
			scenes.forEach((scene: SceneInterface) => {
				if (scene.isSceneExciting) this.excitingScenes++;
				if (scene.isSceneActive) this.activeScenes++;
			});

			this.excitmentPercentage = this.excitingScenes * 100 / scenes.length;
			this.activityPercentage = this.activeScenes * 100 / scenes.length;
		}
	}

	private get scenes(
	): Array<SceneInterface> {
		if (this.parentId.type === ComponentType.Act) {
			return this.database.readList<SceneInterface>(ComponentType.Scene, this.parentId);
		} else {
			return this.database.read<SceneInterface>(
				(scene: SceneInterface) =>
					scene.id.type === ComponentType.Scene &&
					scene.id.campaignId === this.parentId.campaignId &&
					scene.sessionId === this.parentId.sessionId,
			);
		}
	}

	public get excitementLevel(
	):ThresholdResult {
		const expectedThreshold = this.abtStageExcitementThreshold.get(this.abtStage);

		if (expectedThreshold === undefined || this.excitmentPercentage === undefined) return ThresholdResult.NotAnalysable;

		if (this.excitmentPercentage > expectedThreshold + 10) return ThresholdResult.Higher;
		if (this.excitmentPercentage < expectedThreshold - 10) return ThresholdResult.Lower;

		return ThresholdResult.Correct;
	}

	public get activityLevel(
	):ThresholdResult {
		const expectedThreshold = this.abtStageActivityThreshold.get(this.abtStage);

		if (expectedThreshold === undefined || this.activityPercentage === undefined) return ThresholdResult.NotAnalysable;

		if (this.activityPercentage > expectedThreshold + 10) return ThresholdResult.Higher;
		if (this.activityPercentage < expectedThreshold - 40) return ThresholdResult.CriticallyLow;
		if (this.activityPercentage < expectedThreshold - 10) return ThresholdResult.Lower;

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
		const response = this.abtStageExcitementThreshold.get(this.abtStage);

		return response ?? 0;
	}

	public get targetActiveScenePercentage(
	): number {
		const response = this.abtStageActivityThreshold.get(this.abtStage);

		return response ?? 0;
	}
}
