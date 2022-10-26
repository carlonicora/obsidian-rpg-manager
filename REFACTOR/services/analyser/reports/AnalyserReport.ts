import {AnalyserReportInterface} from "../interfaces/AnalyserReportInterface";
import {AnalyserReportDetailInterface} from "../interfaces/AnalyserReportDetailInterface";
import {AnalyserDetailType} from "../enums/AnalyserDetailType";
import {AnalyserDataInterface} from "../interfaces/AnalyserDataInterface";
import {AbstractRpgManager} from "../../../abstracts/AbstractRpgManager";
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
		private _data: AnalyserDataInterface,
	) {
		super(app);

		this.activity = new AnalyserReportActivityDetail(_data);
		this.duration = new AnalyserReportDurationDetail(_data);
		this.excitement = new AnalyserReportExcitementDetail(_data);
		this.interest = new AnalyserReportInterestDetail(_data);
		this.variety = new AnalyserReportVarietyDetail(_data);

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
		return this._data.isValid;
	}

	get details(): AnalyserReportDetailInterface[] {
		const response: AnalyserReportDetailInterface[] = [];

		this._reportDetails.forEach((detail: AnalyserReportDetailInterface) => {
			if (detail.isRelevant) response.push(detail);
		});

		return response;
	}

	get actualDuration(): number|undefined {
		return this._data.totalRunningTime;
	}

	get expectedDuration(): number|undefined {
		return this._data.totalExpectedRunningTime;
	}

	get targetDuration(): number|undefined {
		if (this._data.totalTargetDuration === undefined)
			return undefined;

		return this._data.totalTargetDuration * 60;
	}

	get durationThreshold(): AnalyserThresholdResult {
		if (this.targetDuration === undefined || this.actualDuration === undefined) return AnalyserThresholdResult.Correct;

		if (this.durationPercentage < 30) return AnalyserThresholdResult.CriticallyLow;
		if (this.durationPercentage < 60) return AnalyserThresholdResult.Low;
		if (this.durationPercentage < 75) return AnalyserThresholdResult.Correct;
		if (this.durationPercentage < 90) return AnalyserThresholdResult.High;

		return AnalyserThresholdResult.CriticallyHigh;
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

	get durationPercentage(): number {
		if (this.targetDuration === undefined || this.actualDuration === undefined) return 0;

		if (this.actualDuration > (this.targetDuration * 2))
			return 0;

		if (this.actualDuration > this.targetDuration) {
			const actualDuration = this.targetDuration -  (this.actualDuration - this.targetDuration);
			return Math.floor(actualDuration * 100 / this.targetDuration);
		}

		return Math.floor(this.actualDuration * 100 / this.targetDuration);
	}

	get thresholdType(): AnalyserThresholdResult {
		if (this.percentage < 30) return AnalyserThresholdResult.CriticallyLow;
		if (this.percentage < 60) return AnalyserThresholdResult.Low;
		if (this.percentage < 75) return AnalyserThresholdResult.Correct;
		if (this.percentage < 90) return AnalyserThresholdResult.High;

		return AnalyserThresholdResult.CriticallyHigh;
	}
}
