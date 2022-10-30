import {AbstractAnalyserReportDetail} from "../../abstracts/AbstractAnalyserReportDetail";
import {AnalyserScoreType} from "../../enums/AnalyserScoreType";
import {AnalyserDataInterface} from "../../interfaces/AnalyserDataInterface";
import {AbtStage} from "../../../plotsService/enums/AbtStage";
import {AnalyserDetailType} from "../../enums/AnalyserDetailType";
import {AnalyserThresholdResult} from "../../enums/AnalyserThresholdResult";

export class AnalyserReportExcitementDetail extends AbstractAnalyserReportDetail {
	protected _type:AnalyserScoreType = AnalyserScoreType.Time;
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

		this._maximumScore = this.data.totalExpectedRunningTime;
		this._score = this.data.totalExpectedExcitmentDuration;

		if (this.data.abtStage === undefined) {
			this._idealScore =  Math.floor(this.maximumScore * 50 / 100);
		} else {
			this._idealScore = Math.floor(this.maximumScore * (this._abtStageExcitementThreshold.get(this.data.abtStage) ?? 50) / 100);
		}
	}

	get percentage(): number {
		if (this._idealScore === undefined) return 0;

		if (this._score === this._idealScore) return 100;
		if (this._score > (this._idealScore * 2)) return 0;
		if (this._score > this._idealScore) return Math.floor((this._idealScore - (this._score - this._idealScore)) * 100 / this._idealScore);
		return Math.floor(this._score * 100 / this._idealScore);
	}

	get thresholdType(): AnalyserThresholdResult {
		return this.percentageThresholdScore;
	}
}
