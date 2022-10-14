import {AbstractAnalyserReportDetail} from "../../abstracts/AbstractAnalyserReportDetail";
import {AnalyserScoreType} from "../../enums/AnalyserScoreType";
import {AnalyserDataInterface} from "../../interfaces/AnalyserDataInterface";
import {AbtStage} from "../../../plots/enums/AbtStage";
import {AnalyserDetailType} from "../../enums/AnalyserDetailType";
import {AnalyserThresholdResult} from "../../enums/AnalyserThresholdResult";

export class AnalyserReportExcitementDetail extends AbstractAnalyserReportDetail {
	protected _type:AnalyserScoreType = AnalyserScoreType.Percentage;
	protected _detailType: AnalyserDetailType = AnalyserDetailType.Excitement;

	private _abtStageExcitementThreshold: Map<AbtStage, number> = new Map<AbtStage, number>([
		[AbtStage.Need, 35],
		[AbtStage.And, 35],
		[AbtStage.But, 75],
		[AbtStage.Therefore, 50],
	]);

	constructor(
		data: AnalyserDataInterface,
	) {
		super(data);

		if (this.data.totalExpectedRunningTime === 0) return;

		if (this.data.abtStage === undefined) {
			this._expectedThreshold = 50;
		} else {
			this._expectedThreshold = this._abtStageExcitementThreshold.get(this.data.abtStage);
		}

		this._maximumScore = this.data.dataLength;
		this._score = this.data.totalActiveScenes;
	}

	get ideal(): number|undefined {
		return this._expectedThreshold;
	}

	get thresholdType(): AnalyserThresholdResult {
		if (this.data.totalExpectedRunningTime === 0 || this._expectedThreshold === undefined) return 0;

		if (this.percentage > (this._expectedThreshold + 25)) return  AnalyserThresholdResult.CriticallyHigh;
		if (this.percentage > (this._expectedThreshold + 10)) return AnalyserThresholdResult.High;
		if (this.percentage < (this._expectedThreshold - 25)) return  AnalyserThresholdResult.CriticallyLow;
		if (this.percentage < (this._expectedThreshold - 10)) return AnalyserThresholdResult.Low;
		return AnalyserThresholdResult.Correct;
	}
}
