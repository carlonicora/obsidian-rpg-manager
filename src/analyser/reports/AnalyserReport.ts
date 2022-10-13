import {AnalyserReportInterface} from "../interfaces/AnalyserReportInterface";
import {AnalyserReportDetailInterface} from "../interfaces/AnalyserReportDetailInterface";
import {AnalyserReportDetail} from "./AnalyserReportDetail";
import {AnalyserDetailType} from "../enums/AnalyserDetailType";
import {AnalyserDataInterface} from "../interfaces/AnalyserDataInterface";
import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {AbtStage} from "../../plots/enums/AbtStage";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {AnalyserReportScoreInterface} from "../interfaces/AnalyserReportScoreInterface";
import {App} from "obsidian";
import {AnalyserScoreType} from "../enums/AnalyserScoreType";

export class AnalyserReport extends AbstractRpgManager implements AnalyserReportInterface, AnalyserReportScoreInterface {
	public excitement: AnalyserReportDetailInterface;
	public activity: AnalyserReportDetailInterface;
	public variety: AnalyserReportDetailInterface;
	public interest: AnalyserReportDetailInterface;
	public duration: AnalyserReportDetailInterface;

	private _reportDetails: Map<AnalyserDetailType, AnalyserReportDetailInterface>;

	private _abtStageExcitementThreshold: Map<AbtStage, number> = new Map<AbtStage, number>([
		[AbtStage.Need, 35],
		[AbtStage.And, 35],
		[AbtStage.But, 75],
		[AbtStage.Therefore, 50],
	]);

	private _abtStageActivityThreshold: Map<AbtStage, number> = new Map<AbtStage, number>([
		[AbtStage.Need, 35],
		[AbtStage.And, 75],
		[AbtStage.But, 50],
		[AbtStage.Therefore, 75],
	]);

	constructor(
		app: App,
		private data: AnalyserDataInterface,
	) {
		super(app);

		this.activity = new AnalyserReportDetail(data);
		this.duration = new AnalyserReportDetail(data);
		this.excitement = new AnalyserReportDetail(data);
		this.interest = new AnalyserReportDetail(data);
		this.variety = new AnalyserReportDetail(data);

		this._reportDetails = new Map<AnalyserDetailType, AnalyserReportDetailInterface>([
			[AnalyserDetailType.Activity, this.activity],
			[AnalyserDetailType.Duration, this.duration],
			[AnalyserDetailType.Excitement, this.excitement],
			[AnalyserDetailType.Interest, this.interest],
			[AnalyserDetailType.Variety, this.variety],
		]);
	}

	get type(): AnalyserScoreType {
		return AnalyserScoreType.Percentage;
	}

	get score(): number {
		let response = 0;

		this._reportDetails.forEach((analyser: AnalyserReportDetailInterface) => {
			if (analyser.isRelevant)
				response += analyser.score;

		});

		return response;
	}

	get maximumScore(): number {
		let response = 0;

		this._reportDetails.forEach((analyser: AnalyserReportDetailInterface) => {
			if (analyser.isRelevant)
				response += 100;
		});

		return response;
	}

	get percentage(): number {
		return Math.floor(this.score * 100 / this.maximumScore);
	}

	get threshold(): AnalyserThresholdResult {
		const score = this.score;

		if (score < 20) return AnalyserThresholdResult.CriticallyLow;
		if (score < 40) return AnalyserThresholdResult.Low;
		if (score < 60) return AnalyserThresholdResult.Correct;
		if (score < 80) return AnalyserThresholdResult.High;

		return AnalyserThresholdResult.CriticallyHigh;
	}
}
