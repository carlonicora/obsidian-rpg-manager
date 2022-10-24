import {AbstractAnalyserReportDetail} from "../../abstracts/AbstractAnalyserReportDetail";
import {AnalyserScoreType} from "../../enums/AnalyserScoreType";
import {AnalyserDataInterface} from "../../interfaces/AnalyserDataInterface";
import {AnalyserDetailType} from "../../enums/AnalyserDetailType";

export class AnalyserReportVarietyDetail extends AbstractAnalyserReportDetail {
	protected _type:AnalyserScoreType = AnalyserScoreType.Percentage;
	protected _detailType: AnalyserDetailType = AnalyserDetailType.Variety;

	constructor(
		data: AnalyserDataInterface,
	) {
		super(data);

		this._score = this.data.dataTypeUsed.size;
		this._maximumScore = this.data.dataLength;
		this._idealScore = 6;
	}

	get percentage(): number {
		if (this._idealScore === undefined) return 0;

		if (this._score >= this._idealScore) return 100;
		return Math.floor(this._score * 100 / this._idealScore);
	}

	get isHighBetter(): boolean {
		return true;
	}
}
