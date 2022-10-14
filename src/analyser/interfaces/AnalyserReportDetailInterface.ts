import {AnalyserReportScoreInterface} from "./AnalyserReportScoreInterface";
import {AnalyserDetailType} from "../enums/AnalyserDetailType";

export interface AnalyserReportDetailInterface extends AnalyserReportScoreInterface{
	get detailType(): AnalyserDetailType;
	get isRelevant(): boolean;
}
