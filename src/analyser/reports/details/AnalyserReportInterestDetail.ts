import {AbstractAnalyserReportDetail} from "../../abstracts/AbstractAnalyserReportDetail";
import {AnalyserScoreType} from "../../enums/AnalyserScoreType";
import {AnalyserDataInterface} from "../../interfaces/AnalyserDataInterface";
import {AnalyserDetailType} from "../../enums/AnalyserDetailType";
import {AnalyserThresholdResult} from "../../enums/AnalyserThresholdResult";

export class AnalyserReportInterestDetail extends AbstractAnalyserReportDetail {
	protected _type:AnalyserScoreType = AnalyserScoreType.Percentage;
	protected _detailType: AnalyserDetailType = AnalyserDetailType.Interest;

	constructor(
		data: AnalyserDataInterface,
	) {
		super(data);

		this._maximumScore = this.data.dataLength;
		this._score = this.data.totalRepetitiveScenes;
	}

	get ideal(): number|undefined {
		return Math.floor(this._maximumScore / 4);
	}

	get thresholdType(): AnalyserThresholdResult {
		if (this._score >= (this._maximumScore / 2)) return AnalyserThresholdResult.CriticallyHigh;
		if (this._score >= (this._maximumScore / 3)) return AnalyserThresholdResult.High;
		return AnalyserThresholdResult.Correct;
	}
}
