import {AnalyserReportInterface} from "./AnalyserReportInterface";
import {AnalyserReportType} from "../enums/AnalyserReportType";

export interface AnalyserInterface {
	set targetDuration(duration: number);
	render(
		type: AnalyserReportType,
		containerEl: HTMLDivElement,
	): void;
}
