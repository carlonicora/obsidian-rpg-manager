import {AbstractAnalyserReportDetail} from "../../abstracts/AbstractAnalyserReportDetail";
import {AnalyserScoreType} from "../../enums/AnalyserScoreType";
import {AnalyserDataInterface} from "../../interfaces/AnalyserDataInterface";
import {AnalyserDetailType} from "../../enums/AnalyserDetailType";
import {AnalyserThresholdResult} from "../../enums/AnalyserThresholdResult";

export class AnalyserReportDurationDetail extends AbstractAnalyserReportDetail {
	protected _type:AnalyserScoreType = AnalyserScoreType.Time;
	protected _detailType: AnalyserDetailType = AnalyserDetailType.Duration;

	constructor(
		data: AnalyserDataInterface,
	) {
		super(data);

		if (this.data.totalTargetDuration === 0 || this.data.totalExpectedRunningTime) {
			this._isRelevant = false;
			return;
		}

		this._maximumScore = this.data.totalTargetDuration;
		this._score = Math.floor(this.data.totalExpectedRunningTime / 60);

		const differenceStep = this._maximumScore /10;
		this._threshold = this._maximumScore + differenceStep * 3;
	}

	get percentage(): number {
		if (this.data.totalTargetDuration === 0 || this.data.totalExpectedRunningTime === 0 || this._expectedThreshold === undefined) return 0;

		const difference = Math.abs(this._maximumScore-this._score);

		return Math.floor(difference/this._maximumScore*100);
	}

	get thresholdType(): AnalyserThresholdResult {
		if (this.data.totalTargetDuration === 0 || this.data.totalExpectedRunningTime === 0 || this._expectedThreshold === undefined) return 0;

		if (this._score > this._expectedThreshold) return  AnalyserThresholdResult.CriticallyHigh;
		if (this._score > this._expectedThreshold) return AnalyserThresholdResult.High;
		if (this._score < this._expectedThreshold) return  AnalyserThresholdResult.CriticallyLow;
		if (this._score < this._expectedThreshold) return AnalyserThresholdResult.Low;
		return AnalyserThresholdResult.Correct;
	}
}
