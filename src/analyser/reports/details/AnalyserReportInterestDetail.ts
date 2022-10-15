import {AbstractAnalyserReportDetail} from "../../abstracts/AbstractAnalyserReportDetail";
import {AnalyserScoreType} from "../../enums/AnalyserScoreType";
import {AnalyserDataInterface} from "../../interfaces/AnalyserDataInterface";
import {AnalyserDetailType} from "../../enums/AnalyserDetailType";

export class AnalyserReportInterestDetail extends AbstractAnalyserReportDetail {
	protected _type:AnalyserScoreType = AnalyserScoreType.Percentage;
	protected _detailType: AnalyserDetailType = AnalyserDetailType.Interest;

	constructor(
		data: AnalyserDataInterface,
	) {
		super(data);

		this._score = this.data.dataLength - this.data.totalRepetitiveScenes;
		this._maximumScore = this.data.dataLength;
		this._idealScore = this.data.dataLength;
	}
}
