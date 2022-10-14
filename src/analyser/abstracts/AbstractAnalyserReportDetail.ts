import {AnalyserReportDetailInterface} from "../interfaces/AnalyserReportDetailInterface";
import {AnalyserScoreType} from "../enums/AnalyserScoreType";
import {AnalyserDataInterface} from "../interfaces/AnalyserDataInterface";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {AnalyserDetailType} from "../enums/AnalyserDetailType";

export abstract class AbstractAnalyserReportDetail implements AnalyserReportDetailInterface {
	protected _detailType: AnalyserDetailType;
	protected _type: AnalyserScoreType;
	protected _threshold: AnalyserThresholdResult;
	protected _isRelevant: boolean;
	protected _maximumScore: number;
	protected _score: number;
	protected _idealScore: number|undefined;

	constructor(
		protected data: AnalyserDataInterface,
	) {
		this._isRelevant = true;
	}

	get ideal(): number|undefined {
		return this._idealScore;
	}

	get detailType(): AnalyserDetailType {
		return this._detailType;
	}

	get scoreType(): AnalyserScoreType {
		return this._type;
	}

	get isRelevant(): boolean {
		return this._isRelevant;
	}

	get maximumScore(): number {
		return this._maximumScore;
	}

	get score(): number {
		return this._score;
	}

	get percentage(): number {
		if (this.maximumScore === 0) return 0;
		return Math.floor(this.score * 100 / this.maximumScore);
	}

	get thresholdType(): AnalyserThresholdResult {
		if (this.data.totalTargetDuration === 0 || this.data.totalExpectedRunningTime === 0) return 0;

		if (this.percentage < 50) return AnalyserThresholdResult.CriticallyLow;
		if (this.percentage < 80) return AnalyserThresholdResult.Low;

		return AnalyserThresholdResult.Correct;
	}

	protected get percentageThresholdScore(): AnalyserThresholdResult {
		if (this._idealScore === undefined) return AnalyserThresholdResult.NotAnalysable;

		if (this._score > this._idealScore){
			if (this.percentage < 60)
				return AnalyserThresholdResult.CriticallyHigh;

			if (this.percentage < 80)
				return AnalyserThresholdResult.High;
		} else {
			if (this.percentage < 60)
				return AnalyserThresholdResult.CriticallyLow;

			if (this.percentage < 80)
				return AnalyserThresholdResult.Low;
		}

		return AnalyserThresholdResult.Correct;
	}
}
