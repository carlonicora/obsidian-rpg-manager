import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {AnalyserScoreType} from "../enums/AnalyserScoreType";

export interface AnalyserReportScoreInterface {
	get maximumScore(): number;
	get score(): number;
	get percentage(): number;
	get threshold(): AnalyserThresholdResult;
}
