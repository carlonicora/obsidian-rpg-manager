import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";

export interface AnalyserReportDetailInterface {
	type: string;
	threshold: AnalyserThresholdResult;
	points: number;
	total: number;
	current: number;
	description: string;
	details: string;

	get percentage(): number;
}
