import {AnalyserReportDetailInterface} from "./AnalyserReportDetailInterface";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";

export interface AnalyserReportInterface {
	excitement: AnalyserReportDetailInterface;
	activity: AnalyserReportDetailInterface;
	variety: AnalyserReportDetailInterface;
	interest: AnalyserReportDetailInterface;
	duration: AnalyserReportDetailInterface;
}
