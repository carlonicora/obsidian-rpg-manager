import {AnalyserReportDetailInterface} from "../interfaces/AnalyserReportDetailInterface";
import {AnalyserScoreType} from "../enums/AnalyserScoreType";
import {AnalyserDataInterface} from "../interfaces/AnalyserDataInterface";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {AnalyserDetailType} from "../enums/AnalyserDetailType";

export abstract class AbstractAnalyserReportDetail implements AnalyserReportDetailInterface {
	protected _detailType: AnalyserDetailType;
	protected _type: AnalyserScoreType;
	protected _threshold: AnalyserThresholdResult;
	protected _isRelevant: boolean;
	protected _maximumScore: number;
	protected _score: number;
	protected _expectedThreshold: number|undefined;

	constructor(
		protected data: AnalyserDataInterface,
	) {
		this._isRelevant = true;
	}

	get ideal(): number|undefined {
		return undefined;
	}

	get detailType(): AnalyserDetailType {
		return this._detailType;
	}

	get thresholdType(): AnalyserThresholdResult {
		return this._threshold;
	}

	get scoreType(): AnalyserScoreType {
		return this._type;
	}

	get isRelevant(): boolean {
		return this._isRelevant;
	}

	get maximumScore(): number {
		return this._maximumScore;
	}

	get score(): number {
		return this._score;
	}

	get percentage(): number {
		if (this.maximumScore === 0 || this.score === 0) return 0;
		return Math.floor(this.score * 100 / this.maximumScore);
	}
}
