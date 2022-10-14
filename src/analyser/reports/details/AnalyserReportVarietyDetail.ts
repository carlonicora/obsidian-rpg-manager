import {AbstractAnalyserReportDetail} from "../../abstracts/AbstractAnalyserReportDetail";
import {AnalyserScoreType} from "../../enums/AnalyserScoreType";
import {AnalyserDataInterface} from "../../interfaces/AnalyserDataInterface";
import {AnalyserDetailType} from "../../enums/AnalyserDetailType";
import {AnalyserThresholdResult} from "../../enums/AnalyserThresholdResult";

export class AnalyserReportVarietyDetail extends AbstractAnalyserReportDetail {
	protected _type:AnalyserScoreType = AnalyserScoreType.Percentage;
	protected _detailType: AnalyserDetailType = AnalyserDetailType.Variety;

	constructor(
		data: AnalyserDataInterface,
	) {
		super(data);

		this._maximumScore = this.data.dataLength;
		this._score = this.data.dataTypeUsed.size;
	}

	get thresholdType(): AnalyserThresholdResult {
		if (this._score < 3) return AnalyserThresholdResult.CriticallyLow;
		if (this._score < 6) return AnalyserThresholdResult.Low;
		return AnalyserThresholdResult.Correct;
	}
}
