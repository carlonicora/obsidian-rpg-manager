import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {AnalyserScoreType} from "../enums/AnalyserScoreType";

export interface AnalyserReportScoreInterface {
	get thresholdType(): AnalyserThresholdResult;
	get scoreType(): AnalyserScoreType;

	get maximumScore(): number;
	get score(): number;
	get percentage(): number;
	get ideal(): number|undefined;
}
