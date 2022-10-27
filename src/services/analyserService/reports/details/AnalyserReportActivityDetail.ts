import {AbstractAnalyserReportDetail} from "../../abstracts/AbstractAnalyserReportDetail";
import {AnalyserScoreType} from "../../enums/AnalyserScoreType";
import {AnalyserDataInterface} from "../../interfaces/AnalyserDataInterface";
import {AnalyserThresholdResult} from "../../enums/AnalyserThresholdResult";
import {AbtStage} from "../../../plotsServices/enums/AbtStage";
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

		this._maximumScore = this.data.dataLength;
		this._score = this.data.totalActiveScenes;

		if (this.data.abtStage === undefined) {
			this._idealScore =  Math.floor(this.maximumScore * 50 / 100);
		} else {
			this._idealScore = Math.floor(this.maximumScore * (this._abtStageActivityThreshold.get(this.data.abtStage) ?? 50) / 100);
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
