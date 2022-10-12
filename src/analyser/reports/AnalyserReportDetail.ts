import {AnalyserReportDetailInterface} from "../interfaces/AnalyserReportDetailInterface";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";

export class AnalyserReportDetail implements AnalyserReportDetailInterface {
	public type: string;
	public threshold: AnalyserThresholdResult;
	public points: number;
	public total: number;
	public current: number;
	public description: string;
	public details: string;

	constructor(
	) {
	}

	get percentage(): number {

	}
}
