import {AnalyserReportDetailInterface} from "./AnalyserReportDetailInterface";
import {AnalyserReportScoreInterface} from "./AnalyserReportScoreInterface";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";

export interface AnalyserReportInterface extends AnalyserReportScoreInterface{
	get isValid(): boolean;
	get details(): AnalyserReportDetailInterface[];

	get actualDuration(): number|undefined;
	get expectedDuration(): number|undefined;
	get targetDuration(): number|undefined;

	get durationPercentage(): number;
	get durationThreshold(): AnalyserThresholdResult;
}
