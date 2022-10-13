import {AnalyserReporter} from "../reporters/AnalyserReporter";
import {AnalyserReportInterface} from "../interfaces/AnalyserReportInterface";
import {AnalyserDetailType} from "../enums/AnalyserDetailType";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {AbstractAnalyserView} from "../abstracts/AbstractAnalyserView";

export class AnalyserExtendedView extends AbstractAnalyserView {
	protected descriptions: Map<AnalyserDetailType|undefined, Map<AnalyserThresholdResult, string>>
		= new Map<AnalyserDetailType | undefined, Map<AnalyserThresholdResult, string>>([
		[undefined, new Map<AnalyserThresholdResult, string>([
			[AnalyserThresholdResult.CriticallyHigh, ''],
			[AnalyserThresholdResult.High, ''],
			[AnalyserThresholdResult.Correct, ''],
			[AnalyserThresholdResult.Low, ''],
			[AnalyserThresholdResult.CriticallyLow, ''],
			[AnalyserThresholdResult.NotAnalysable, ''],
		])],
		[AnalyserDetailType.Activity, new Map<AnalyserThresholdResult, string>([
			[AnalyserThresholdResult.CriticallyHigh, ''],
			[AnalyserThresholdResult.High, ''],
			[AnalyserThresholdResult.Correct, ''],
			[AnalyserThresholdResult.Low, ''],
			[AnalyserThresholdResult.CriticallyLow, ''],
			[AnalyserThresholdResult.NotAnalysable, ''],
		])],
		[AnalyserDetailType.Duration, new Map<AnalyserThresholdResult, string>([
			[AnalyserThresholdResult.CriticallyHigh, ''],
			[AnalyserThresholdResult.High, ''],
			[AnalyserThresholdResult.Correct, ''],
			[AnalyserThresholdResult.Low, ''],
			[AnalyserThresholdResult.CriticallyLow, ''],
			[AnalyserThresholdResult.NotAnalysable, ''],
		])],
		[AnalyserDetailType.Excitement, new Map<AnalyserThresholdResult, string>([
			[AnalyserThresholdResult.CriticallyHigh, ''],
			[AnalyserThresholdResult.High, ''],
			[AnalyserThresholdResult.Correct, ''],
			[AnalyserThresholdResult.Low, ''],
			[AnalyserThresholdResult.CriticallyLow, ''],
			[AnalyserThresholdResult.NotAnalysable, ''],
		])],
		[AnalyserDetailType.Interest, new Map<AnalyserThresholdResult, string>([
			[AnalyserThresholdResult.CriticallyHigh, ''],
			[AnalyserThresholdResult.High, ''],
			[AnalyserThresholdResult.Correct, ''],
			[AnalyserThresholdResult.Low, ''],
			[AnalyserThresholdResult.CriticallyLow, ''],
			[AnalyserThresholdResult.NotAnalysable, ''],
		])],
		[AnalyserDetailType.Variety, new Map<AnalyserThresholdResult, string>([
			[AnalyserThresholdResult.CriticallyHigh, ''],
			[AnalyserThresholdResult.High, ''],
			[AnalyserThresholdResult.Correct, ''],
			[AnalyserThresholdResult.Low, ''],
			[AnalyserThresholdResult.CriticallyLow, ''],
			[AnalyserThresholdResult.NotAnalysable, ''],
		])],
	])
}
