import {AnalyserDataInterface} from "../interfaces/AnalyserDataInterface";
import {AbtStage} from "../../plotsService/enums/AbtStage";
import {SceneType} from "../enums/SceneType";

export class AnalyserData implements AnalyserDataInterface {
	public abtStage: AbtStage|undefined = undefined;
	public dataLength = 0;
	public totalRunningTime = 0;
	public totalActiveScenes = 0;
	public totalRepetitiveScenes = 0;
	public totalExpectedRunningTime = 0;
	public totalExpectedExcitmentDuration = 0;
	public totalTargetDuration = 0;
	public dataTypeUsed: Map<SceneType, number> = new Map<SceneType, number>();

	private _previousType: SceneType|undefined = undefined;

	get isValid(): boolean {
		return this.dataLength !== 0;
	}

	set dataCount(count: number) {
		this.dataLength = count;
	}

	public addExpectedRunningTime(
		duration: number
	): void {
		this.totalExpectedRunningTime += duration;
	}

	public addExpectedExcitmentDuration(
		duration: number,
	): void {
		this.totalExpectedExcitmentDuration += duration;
	}

	public addActiveScene(
	): void {
		this.totalActiveScenes++;
	}

	addSceneType(
		type: SceneType|undefined,
	): void {
		if (type !== undefined) {
			this.dataTypeUsed.set(type, (this.dataTypeUsed.get(type) ?? 0) + 1);
			if (this._previousType === type) {
				this.totalRepetitiveScenes++;
			} else {
				this._previousType = type;
			}
		}
	}
}
