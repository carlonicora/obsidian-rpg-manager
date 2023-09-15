import { AbtStage } from "src/data/enums/AbtStage";
import { SceneType } from "src/data/enums/SceneType";
import { SceneAnalysisInterface } from "./interfaces/SceneAnalysisInterface";

export class SceneAnalysis implements SceneAnalysisInterface {
	private _activity = 0;
	private _excitement = 0;
	private _interest = 0;
	private _variety = 0;
	//private _duration = 0;
	private _expectedDuration = 0;
	private _excitingDuration = 0;
	private _activeDuration = 0;
	private _sceneTypeUsed: SceneType[] = [];
	private _sceneCount = 0;
	private _duplicatedSuccessiveSceneType = 0;

	constructor(private _abtStage: AbtStage | undefined, private _durationGoal: number | undefined) {}

	get score(): number {
		let response = 0;

		if (this._durationGoal !== undefined) {
			response += this.duration ?? 0;
		}

		response += 100 - Math.abs(this.activity);
		response += 100 - Math.abs(this.excitement);
		response += 100 + this.interest;
		response += 100 + this.variety;

		return Math.round(this._durationGoal === undefined ? response / 4 : response / 5);
	}

	get activity(): number {
		const goalLookup = {
			[AbtStage.Need]: 0.35,
			[AbtStage.And]: 0.75,
			[AbtStage.But]: 0.5,
			[AbtStage.Therefore]: 0.75,
		};

		const goal: number = (goalLookup[this._abtStage] || 0.5) * this._expectedDuration;

		let response = Math.round(((this._activeDuration - goal) / goal) * 100);

		if (response > 100) {
			response = 100;
		} else if (response < -100) {
			response = -100;
		}

		return response;
	}

	get excitement(): number {
		const goalLookup = {
			[AbtStage.Need]: 0.35,
			[AbtStage.And]: 0.75,
			[AbtStage.But]: 0.5,
			[AbtStage.Therefore]: 0.75,
		};

		const goal: number = (goalLookup[this._abtStage] || 0.5) * this._expectedDuration;

		if (this._excitingDuration === goal) {
			return 0;
		} else if (this._excitingDuration >= 2 * goal) {
			return 100;
		} else if (this._excitingDuration < goal) {
			return -Math.round(((goal - this._excitingDuration) / goal) * 100);
		} else if (this._excitingDuration > goal) {
			return Math.round(((this._excitingDuration - goal) / goal) * 100);
		}
	}

	get interest(): number {
		const maxSceneType: number = Object.keys(SceneType).filter((key) => isNaN(Number(key))).length;
		const interestGoal: number = Math.round((this._sceneCount > maxSceneType ? maxSceneType : this._sceneCount) * 0.75);

		if (this._sceneTypeUsed.length >= interestGoal) return 0;

		const response: number = Math.round((this._sceneTypeUsed.length * 100) / interestGoal);

		if (response > 100) return 0;

		return -(100 - response);
	}

	get variety(): number {
		if (this._duplicatedSuccessiveSceneType === 0) return 0;

		return -Math.round((this._duplicatedSuccessiveSceneType / this._sceneCount) * 100);
	}

	get duration(): number | undefined {
		if (this._durationGoal === undefined) return undefined;
		return 100 + ((this._expectedDuration - this._durationGoal) / this._durationGoal) * 100;
	}

	get expectedDuration(): number {
		return this._expectedDuration;
	}

	addExpectedDuration(duration: number): void {
		this._expectedDuration += duration;
	}

	addExcitingDuration(duration: number): void {
		this._excitingDuration += duration;
	}
	addActiveDuration(duration: number): void {
		this._activeDuration += duration;
	}

	addSceneType(sceneType: string): void {
		this._sceneCount++;

		if (this._sceneTypeUsed.includes(sceneType as SceneType)) return;

		this._sceneTypeUsed.push(sceneType as SceneType);
	}

	addDuplicatedSuccessiveSceenType(): void {
		this._duplicatedSuccessiveSceneType++;
	}
}
