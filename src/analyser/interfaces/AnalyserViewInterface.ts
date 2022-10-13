import {AnalyserReportInterface} from "./AnalyserReportInterface";

export interface AnalyserViewInterface {
	render(
		report: AnalyserReportInterface,
		containerEl: HTMLDivElement,
	): void
}
