import {AbstractAnalyserReportDetail} from "../../abstracts/AbstractAnalyserReportDetail";
import {AnalyserScoreType} from "../../enums/AnalyserScoreType";
import {AnalyserDataInterface} from "../../interfaces/AnalyserDataInterface";
import {AnalyserDetailType} from "../../enums/AnalyserDetailType";

export class AnalyserReportDurationDetail extends AbstractAnalyserReportDetail {
	protected _type:AnalyserScoreType = AnalyserScoreType.Time;
	protected _detailType: AnalyserDetailType = AnalyserDetailType.Duration;

	constructor(
		data: AnalyserDataInterface,
	) {
		super(data);

		if (this.data.totalTargetDuration === 0 || this.data.totalExpectedRunningTime === 0) {
			this._isRelevant = false;
			return;
		}

		this._maximumScore = this.data.totalTargetDuration;
		this._score = Math.floor(this.data.totalExpectedRunningTime / 60);
	}

	get percentage(): number {
		if (this.data.totalTargetDuration === 0 || this.data.totalExpectedRunningTime === 0) return 0;

		if (this._score > (this._maximumScore * 2))
			return 0;

		if (this._score > this._maximumScore)
			return Math.floor((this._maximumScore -  (this._score - this._maximumScore)) * 100 / this._maximumScore);

		return Math.floor(this._score * 100 / this._maximumScore);
	}
}
