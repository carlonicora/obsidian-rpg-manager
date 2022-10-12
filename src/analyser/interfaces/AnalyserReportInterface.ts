import {AnalyserReportDetailInterface} from "./AnalyserReportDetailInterface";

export interface AnalyserReportInterface {
	excitement: AnalyserReportDetailInterface;
	activity: AnalyserReportDetailInterface;
	variety: AnalyserReportDetailInterface;
	interest: AnalyserReportDetailInterface;
	duration: AnalyserReportDetailInterface;

	get score(): number;
	get description(): string;
	set description(description: string);
	get type(): string;
	set type(type: string);
}
