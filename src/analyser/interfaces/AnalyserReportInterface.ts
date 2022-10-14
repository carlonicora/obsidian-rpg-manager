import {AnalyserReportDetailInterface} from "./AnalyserReportDetailInterface";
import {AnalyserReportScoreInterface} from "./AnalyserReportScoreInterface";

export interface AnalyserReportInterface extends AnalyserReportScoreInterface{
	get isValid(): boolean;
	get details(): Array<AnalyserReportDetailInterface>;

	get actualDuration(): number|undefined;
	get expectedDuration(): number|undefined;
	get targetDuration(): number|undefined;
}
