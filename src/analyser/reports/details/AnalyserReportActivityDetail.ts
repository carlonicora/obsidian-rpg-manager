import {AbstractAnalyserReportDetail} from "../../abstracts/AbstractAnalyserReportDetail";
import {AnalyserScoreType} from "../../enums/AnalyserScoreType";
import {AnalyserDataInterface} from "../../interfaces/AnalyserDataInterface";
import {AnalyserThresholdResult} from "../../enums/AnalyserThresholdResult";
import {AbtStage} from "../../../plots/enums/AbtStage";
import {AnalyserDetailType} from "../../enums/AnalyserDetailType";

export class AnalyserReportActivityDetail extends AbstractAnalyserReportDetail {
	protected _type:AnalyserScoreType = AnalyserScoreType.Percentage;
	protected _detailType: AnalyserDetailType = AnalyserDetailType.Activity;

	private _abtStageActivityThreshold: Map<AbtStage, number> = new Map<AbtStage, number>([
		[AbtStage.Need, 35],
		[AbtStage.And, 75],
		[AbtStage.But, 50],
		[AbtStage.Therefore, 75],
	]);

	constructor(
		data: AnalyserDataInterface,
	) {
		super(data);

		if (this.data.abtStage === undefined) {
			this._expectedThreshold = 50;
		} else {
			this._expectedThreshold = this._abtStageActivityThreshold.get(this.data.abtStage);
		}

		this._maximumScore = this.data.dataLength;
		this._score = this.data.totalActiveScenes;
	}

	get ideal(): number|undefined {
		if (this._expectedThreshold === undefined)
			return undefined;

		return Math.floor(this._expectedThreshold * this._maximumScore / 100);
	}

	get percentage(): number {
		if (this._expectedThreshold === undefined) return 0;

		const percentageScore = Math.floor(this._score * 100 / this._maximumScore);

		if (percentageScore <= this._expectedThreshold) {
			return 100 - Math.floor((this._expectedThreshold - percentageScore) * 100 / this._expectedThreshold);
		}


		return 100 - Math.floor((percentageScore - this._expectedThreshold) * 100 / (100 - this._expectedThreshold));
	}

	get thresholdType(): AnalyserThresholdResult {
		if (this._expectedThreshold === undefined || this._score === undefined) return this._threshold = AnalyserThresholdResult.NotAnalysable;

		if (this.percentage > (this._expectedThreshold + 25)) return AnalyserThresholdResult.CriticallyHigh;
		if (this.percentage > (this._expectedThreshold + 10)) return this._threshold = AnalyserThresholdResult.High;
		if (this.percentage < (this._expectedThreshold - 25)) return this._threshold = AnalyserThresholdResult.CriticallyLow;
		if (this.percentage < (this._expectedThreshold - 10)) return this._threshold = AnalyserThresholdResult.Low;
		return AnalyserThresholdResult.Correct;
	}
}
