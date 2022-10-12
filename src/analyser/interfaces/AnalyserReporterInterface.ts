import {AnalyserReportInterface} from "./AnalyserReportInterface";

export interface AnalyserReporterInterface {
	generateReport(
	): AnalyserReportInterface;
}
