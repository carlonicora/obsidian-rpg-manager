import {AnalyserReportDetailInterface} from "../interfaces/AnalyserReportDetailInterface";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {AnalyserDataInterface} from "../interfaces/AnalyserDataInterface";
import {AnalyserReportScoreInterface} from "../interfaces/AnalyserReportScoreInterface";
import {AnalyserScoreType} from "../enums/AnalyserScoreType";

export class AnalyserReportDetail implements AnalyserReportDetailInterface, AnalyserReportScoreInterface {
	public threshold: AnalyserThresholdResult;
	public points: number;
	public total: number;
	public current: number;
	public description: string;
	public details: string;

	constructor(
		private data: AnalyserDataInterface,
	) {
	}

	get isRelevant(): boolean {

	}

	get maximumScore(): number {

	}

	get score(): number {

	}

	get percentage(): number {
		return Math.floor(this.score * 100 / this.maximumScore);
	}

	get threshold(): AnalyserThresholdResult {

	}
}
