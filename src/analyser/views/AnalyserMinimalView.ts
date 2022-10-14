import {AnalyserDetailType} from "../enums/AnalyserDetailType";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {AbstractAnalyserView} from "../abstracts/AbstractAnalyserView";

export class AnalyserMinimalView extends AbstractAnalyserView {
	protected descriptions: Map<AnalyserDetailType|undefined, Map<AnalyserThresholdResult, Array<string>>>
		= new Map<AnalyserDetailType | undefined, Map<AnalyserThresholdResult, Array<string>>>([
			[undefined, new Map<AnalyserThresholdResult, Array<string>>([
				[AnalyserThresholdResult.CriticallyHigh, ['', '']],
				[AnalyserThresholdResult.High, ['', '']],
				[AnalyserThresholdResult.Correct, ['', '']],
				[AnalyserThresholdResult.Low, ['', '']],
				[AnalyserThresholdResult.CriticallyLow, ['', '']],
				[AnalyserThresholdResult.NotAnalysable, ['', '']],
			])],
			[AnalyserDetailType.Activity, new Map<AnalyserThresholdResult, Array<string>>([
				[AnalyserThresholdResult.CriticallyHigh, ['', '']],
				[AnalyserThresholdResult.High, ['', '']],
				[AnalyserThresholdResult.Correct, ['', '']],
				[AnalyserThresholdResult.Low, ['', '']],
				[AnalyserThresholdResult.CriticallyLow, ['', '']],
				[AnalyserThresholdResult.NotAnalysable, ['', '']],
			])],
			[AnalyserDetailType.Duration, new Map<AnalyserThresholdResult, Array<string>>([
				[AnalyserThresholdResult.CriticallyHigh, ['', '']],
				[AnalyserThresholdResult.High, ['', '']],
				[AnalyserThresholdResult.Correct, ['', '']],
				[AnalyserThresholdResult.Low, ['', '']],
				[AnalyserThresholdResult.CriticallyLow, ['', '']],
				[AnalyserThresholdResult.NotAnalysable, ['', '']],
			])],
			[AnalyserDetailType.Excitement, new Map<AnalyserThresholdResult, Array<string>>([
				[AnalyserThresholdResult.CriticallyHigh, ['', '']],
				[AnalyserThresholdResult.High, ['', '']],
				[AnalyserThresholdResult.Correct, ['', '']],
				[AnalyserThresholdResult.Low, ['', '']],
				[AnalyserThresholdResult.CriticallyLow, ['', '']],
				[AnalyserThresholdResult.NotAnalysable, ['', '']],
			])],
			[AnalyserDetailType.Interest, new Map<AnalyserThresholdResult, Array<string>>([
				[AnalyserThresholdResult.CriticallyHigh, ['', '']],
				[AnalyserThresholdResult.High, ['', '']],
				[AnalyserThresholdResult.Correct, ['', '']],
				[AnalyserThresholdResult.Low, ['', '']],
				[AnalyserThresholdResult.CriticallyLow, ['', '']],
				[AnalyserThresholdResult.NotAnalysable, ['', '']],
			])],
			[AnalyserDetailType.Variety, new Map<AnalyserThresholdResult, Array<string>>([
				[AnalyserThresholdResult.CriticallyHigh, ['', '']],
				[AnalyserThresholdResult.High, ['', '']],
				[AnalyserThresholdResult.Correct, ['', '']],
				[AnalyserThresholdResult.Low, ['', '']],
				[AnalyserThresholdResult.CriticallyLow, ['', '']],
				[AnalyserThresholdResult.NotAnalysable, ['', '']],
			])],
	])
}
