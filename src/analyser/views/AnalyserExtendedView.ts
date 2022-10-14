import {AnalyserDetailType} from "../enums/AnalyserDetailType";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {AbstractAnalyserView} from "../abstracts/AbstractAnalyserView";

export class AnalyserExtendedView extends AbstractAnalyserView {
	protected descriptions: Map<AnalyserDetailType|undefined, Map<AnalyserThresholdResult, Array<string>>>
		= new Map<AnalyserDetailType | undefined, Map<AnalyserThresholdResult, Array<string>>>([
		[undefined, new Map<AnalyserThresholdResult, Array<string>>([
			[AnalyserThresholdResult.CriticallyHigh, ['The %type% is great. Analysis score %percentage%%']],
			[AnalyserThresholdResult.High, ['The %type% is balanced. Analysis score %percentage%%']],
			[AnalyserThresholdResult.Correct, ['The %type% may work. Analysis score %percentage%%']],
			[AnalyserThresholdResult.Low, ['The %type% still requires some work to be balanced. Analysis score %percentage%%']],
			[AnalyserThresholdResult.CriticallyLow, ['The %type% is not balanced. Analysis score %percentage%%']],
		])],
		[AnalyserDetailType.Activity, new Map<AnalyserThresholdResult, Array<string>>([
			[AnalyserThresholdResult.CriticallyHigh, ['Too many active scenes: ', '( %score% out of %maximumScore% are active. Ideally you should have around %ideal% active scenes)']],
			[AnalyserThresholdResult.High, ['Maybe too many active scenes: ', '( %score% out of %maximumScore% are active. Ideally you should have around %ideal% active scenes)']],
			[AnalyserThresholdResult.Correct, ['The amount of active scenes is balanced', '']],
			[AnalyserThresholdResult.Low, ['Maybe not enough active scenes: ', '(only  %score% out of %maximumScore% are active. Ideally you should have around %ideal% active scenes)']],
			[AnalyserThresholdResult.CriticallyLow, ['Not enough active scenes: ', '(just %score% out of %maximumScore% are active. Ideally you should have around %ideal% active scenes)']],
		])],
		[AnalyserDetailType.Duration, new Map<AnalyserThresholdResult, Array<string>>([
			[AnalyserThresholdResult.CriticallyHigh, ['The session is going to be too long:', '(%percentage%% longer than your target)']],
			[AnalyserThresholdResult.High, ['The session might be too long: ', '(%percentage%% longer than your target)']],
			[AnalyserThresholdResult.Correct, ['The expected duration is in line with your target session duration', '']],
			[AnalyserThresholdResult.Low, ['The session might be short: ', '(%percentage%% shorter than your target)']],
			[AnalyserThresholdResult.CriticallyLow, ['The session is too short: ', '(%percentage%% shorter than your target)']],
		])],
		[AnalyserDetailType.Excitement, new Map<AnalyserThresholdResult, Array<string>>([
			[AnalyserThresholdResult.CriticallyHigh, ['Too much excitement: ', '(%percentage%% of the running time, %score% scenes, is exciting. Ideally you should target the %ideal%%)']],
			[AnalyserThresholdResult.High, ['Maybe too much excitement: ', '(%percentage%% of the running time, %score% scenes, is exciting. Ideally you should target the %ideal%%)']],
			[AnalyserThresholdResult.Correct, ['The amount of exciting time is balanced', '']],
			[AnalyserThresholdResult.Low, ['Maybe not enough excitement: ', '(only %percentage%% of the running time, %score% scenes, is exciting. Ideally you should target the %ideal%%)']],
			[AnalyserThresholdResult.CriticallyLow, ['Not enough excitement: ', '(just %percentage%% of the running time, %score% scenes, is exciting. Ideally you should target the %ideal%%)']],
		])],
		[AnalyserDetailType.Interest, new Map<AnalyserThresholdResult, Array<string>>([
			[AnalyserThresholdResult.CriticallyHigh, ['Repetitive: ', '(really, %score% scenes type repeated in %maximumScore% scenes. Keep it below %ideal%.)']],
			[AnalyserThresholdResult.High, ['Maybe a bit repetitive: ', '(%score% scenes type repeated in %maximumScore% scenes. Try to keep it below %ideal%.)']],
			[AnalyserThresholdResult.Correct, ['The scenes are not repetitive', '']],
		])],
		[AnalyserDetailType.Variety, new Map<AnalyserThresholdResult, Array<string>>([
			[AnalyserThresholdResult.Correct, ['There is a good variety of scenes', '']],
			[AnalyserThresholdResult.Low, ['Maybe not enough variety: ', '(only %score% different type of scenes are used. Aim for %ideal%)']],
			[AnalyserThresholdResult.CriticallyLow, ['Not enough variety:', '(just %score% different type of scenes are used. Aim for %ideal%)']],
		])],
	])
}
