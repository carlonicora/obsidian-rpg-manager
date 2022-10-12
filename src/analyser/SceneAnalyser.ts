import {App} from "obsidian";
import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {ComponentType} from "../components/enums/ComponentType";
import {IdInterface} from "../id/interfaces/IdInterface";
import {AbtStage} from "../plots/enums/AbtStage";
import {SceneType} from "../components/enums/SceneType";
import {SorterComparisonElement} from "../databases/SorterComparisonElement";
import {SceneInterface} from "../components/components/scene/interfaces/SceneInterface";
import {SessionInterface} from "../components/components/session/interfaces/SessionInterface";
import {AnalyserThresholdResult} from "./enums/AnalyserThresholdResult";
import {AnalyserDataImportInterface} from "./interfaces/AnalyserDataImportInterface";
import {AnalyserReportDetailInterface} from "./interfaces/AnalyserReportDetailInterface";
import {AnalyserReportInterface} from "./interfaces/AnalyserReportInterface";
import {AnalyserInterface} from "./interfaces/AnalyserInterface";
import {AbstractAnalyser} from "./abstracts/AbstractAnalyser";


export class SceneAnalyser extends AbstractAnalyser {
	constructor(
		app: App,
		scene: SceneInterface,
		abtStage: AbtStage|undefined,
	) {
		super(app, abtStage);

		this.isSingleScene = true;
		this._addScene(this.database.readSingle<SceneInterface>(ComponentType.Scene, scene.id));

		super._ingestData();
	}
}






export class SceneAnalyserOLD extends AbstractRpgManager implements AnalyserInterface{
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


	public get excitementLevel(
	):AnalyserThresholdResult {
		let expectedThreshold: number|undefined = undefined;
		if (this.abtStage === undefined){
			expectedThreshold = 50;
		} else {
			expectedThreshold = this.abtStageExcitementThreshold.get(this.abtStage);
		}

		if (expectedThreshold === undefined || this.excitmentPercentage === undefined) return AnalyserThresholdResult.NotAnalysable;

		if (this.excitmentPercentage > (expectedThreshold + 25)) return AnalyserThresholdResult.CriticallyHigh;
		if (this.excitmentPercentage > (expectedThreshold + 10)) return AnalyserThresholdResult.High;
		if (this.excitmentPercentage < (expectedThreshold - 25)) return AnalyserThresholdResult.CriticallyLow;
		if (this.excitmentPercentage < (expectedThreshold - 10)) return AnalyserThresholdResult.Low;

		return AnalyserThresholdResult.Correct;
	}

	public get activityLevel(
	):AnalyserThresholdResult {
		let expectedThreshold: number|undefined = undefined;
		if (this.abtStage === undefined){
			expectedThreshold = 50;
		} else {
			expectedThreshold = this.abtStageActivityThreshold.get(this.abtStage);
		}

		if (expectedThreshold === undefined || this.activityPercentage === undefined) return AnalyserThresholdResult.NotAnalysable;

		if (this.activityPercentage > expectedThreshold + 25) return AnalyserThresholdResult.CriticallyHigh;
		if (this.activityPercentage > expectedThreshold + 10) return AnalyserThresholdResult.High;
		if (this.activityPercentage < expectedThreshold - 25) return AnalyserThresholdResult.CriticallyLow;
		if (this.activityPercentage < expectedThreshold - 10) return AnalyserThresholdResult.Low;

		return AnalyserThresholdResult.Correct;
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
	): AnalyserThresholdResult {
		if (this.sceneTypesUsed.size < 4) return AnalyserThresholdResult.CriticallyLow;
		if (this.sceneTypesUsed.size < 6) return AnalyserThresholdResult.Low;
		return AnalyserThresholdResult.Correct;
	}

	public get varietyCount(
	): number {
		return this.sceneTypesUsed.size;
	}

	public get boredomLevel(
	): AnalyserThresholdResult {
		if (this.repetitiveScenes >= (this.scenesCount / 2)) return AnalyserThresholdResult.CriticallyHigh;
		if (this.repetitiveScenes >= (this.scenesCount / 3)) return AnalyserThresholdResult.High;

		return AnalyserThresholdResult.Correct;
	}

	public get targetDurationLevel(
	): AnalyserThresholdResult {
		if (this.targetDuration === undefined || this.expectedRunningTime == undefined) return AnalyserThresholdResult.NotAnalysable;

		const differenceStep = this.targetDuration /10;
		const expectedRunningTime = Math.floor(this.expectedRunningTime/60);

		if (expectedRunningTime > this.targetDuration + differenceStep * 3) return  AnalyserThresholdResult.CriticallyHigh;
		if (expectedRunningTime > this.targetDuration + differenceStep * 1) return AnalyserThresholdResult.High;
		if (expectedRunningTime < this.targetDuration - differenceStep * 3) return  AnalyserThresholdResult.CriticallyLow;
		if (expectedRunningTime < this.targetDuration - differenceStep * 1) return AnalyserThresholdResult.Low;
		return AnalyserThresholdResult.Correct;
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
		threshold: AnalyserThresholdResult,
	): number {
		switch (threshold){
			case AnalyserThresholdResult.Correct:
				return 25;
			case AnalyserThresholdResult.CriticallyHigh:
			case AnalyserThresholdResult.CriticallyLow:
				return 5;
			case AnalyserThresholdResult.High:
			case AnalyserThresholdResult.Low:
				return 15;
		}
		return 0;
	}
}
