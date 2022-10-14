import {AnalyserReportType} from "../enums/AnalyserReportType";

export interface AnalyserInterface {
	get scenesCount(): number;
	set targetDuration(duration: number);
	render(
		type: AnalyserReportType,
		containerEl: HTMLDivElement,
	): void;
}
