import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {AnalyserScoreType} from "../enums/AnalyserScoreType";
import {AnalyserReportScoreInterface} from "./AnalyserReportScoreInterface";

export interface AnalyserReportDetailInterface extends AnalyserReportScoreInterface{
	threshold: AnalyserThresholdResult;
	points: number;
	total: number;
	current: number;
	description: string;
	details: string;

	get isRelevant(): boolean;
}
