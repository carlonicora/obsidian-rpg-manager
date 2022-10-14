import {AnalyserReportInterface} from "../interfaces/AnalyserReportInterface";
import {AnalyserReportDetailInterface} from "../interfaces/AnalyserReportDetailInterface";
import {AnalyserDetailType} from "../enums/AnalyserDetailType";
import {AnalyserDataInterface} from "../interfaces/AnalyserDataInterface";
import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {App} from "obsidian";
import {AnalyserScoreType} from "../enums/AnalyserScoreType";
import {AnalyserReportActivityDetail} from "./details/AnalyserReportActivityDetail";
import {AnalyserReportDurationDetail} from "./details/AnalyserReportDurationDetail";
import {AnalyserReportExcitementDetail} from "./details/AnalyserReportExcitementDetail";
import {AnalyserReportInterestDetail} from "./details/AnalyserReportInterestDetail";
import {AnalyserReportVarietyDetail} from "./details/AnalyserReportVarietyDetail";

export class AnalyserReport extends AbstractRpgManager implements AnalyserReportInterface {
	public excitement: AnalyserReportDetailInterface;
	public activity: AnalyserReportDetailInterface;
	public variety: AnalyserReportDetailInterface;
	public interest: AnalyserReportDetailInterface;
	public duration: AnalyserReportDetailInterface;

	private _reportDetails: Map<AnalyserDetailType, AnalyserReportDetailInterface>;

	constructor(
		app: App,
		private data: AnalyserDataInterface,
	) {
		super(app);

		this.activity = new AnalyserReportActivityDetail(data);
		this.duration = new AnalyserReportDurationDetail(data);
		this.excitement = new AnalyserReportExcitementDetail(data);
		this.interest = new AnalyserReportInterestDetail(data);
		this.variety = new AnalyserReportVarietyDetail(data);

		this._reportDetails = new Map<AnalyserDetailType, AnalyserReportDetailInterface>([
			[AnalyserDetailType.Activity, this.activity],
			[AnalyserDetailType.Duration, this.duration],
			[AnalyserDetailType.Excitement, this.excitement],
			[AnalyserDetailType.Interest, this.interest],
			[AnalyserDetailType.Variety, this.variety],
		]);
	}

	get ideal(): number|undefined {
		return undefined;
	}

	get scoreType(): AnalyserScoreType {
        return AnalyserScoreType.Percentage;
    }

	get isValid(): boolean {
		return this.data.isValid;
	}

	get details(): Array<AnalyserReportDetailInterface> {
		const response: Array<AnalyserReportDetailInterface> = [];

		this._reportDetails.forEach((detail: AnalyserReportDetailInterface) => {
			if (detail.isRelevant) response.push(detail);
		});

		return response;
	}

	get actualDuration(): number|undefined {
		return this.data.totalRunningTime;
	}

	get expectedDuration(): number|undefined {
		return this.data.totalExpectedRunningTime;
	}

	get targetDuration(): number|undefined {
		return this.data.totalTargetDuration;
	}

	get score(): number {
		return 0;
	}

	get maximumScore(): number {
		return 0;
	}

	get percentage(): number {
		let maximumPercentage = 0;
		let percentage = 0;
		this._reportDetails.forEach((analyser: AnalyserReportDetailInterface) => {
			if (analyser.isRelevant) {
				maximumPercentage += 100;
				percentage += analyser.percentage;
			}
		});

		return Math.floor(percentage * 100 / maximumPercentage);
	}

	get thresholdType(): AnalyserThresholdResult {
		if (this.percentage < 20) return AnalyserThresholdResult.CriticallyLow;
		if (this.percentage < 50) return AnalyserThresholdResult.Low;
		if (this.percentage < 75) return AnalyserThresholdResult.Correct;
		if (this.percentage < 90) return AnalyserThresholdResult.High;

		return AnalyserThresholdResult.CriticallyHigh;
	}
}
