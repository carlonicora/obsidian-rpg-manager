import {AbstractRpgManager} from "../../../../abstracts/AbstractRpgManager";
import {App} from "obsidian";
import {AnalyserReportInterface} from "../../interfaces/AnalyserReportInterface";
import {AnalyserDetailType} from "../../enums/AnalyserDetailType";
import {AnalyserThresholdResult} from "../../enums/AnalyserThresholdResult";
import {AnalyserViewInterface} from "../../interfaces/AnalyserViewInterface";
import {ComponentType} from "../../../../../src/core/enums/ComponentType";

export abstract class AbstractAnalyserView extends AbstractRpgManager implements AnalyserViewInterface {
	protected titles: Map<AnalyserDetailType|undefined, string>;
	protected descriptions: Map<AnalyserDetailType|undefined, Map<AnalyserThresholdResult, string|undefined>> =
		new Map<AnalyserDetailType, Map<AnalyserThresholdResult, string | undefined>>([
			[AnalyserDetailType.Activity, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.CriticallyHigh, 'Really, %score% scenes out of %maximumScore% are active, you should aim for %ideal%'],
				[AnalyserThresholdResult.High, '%score% scenes out of %maximumScore% are active, you should aim for %ideal%'],
				[AnalyserThresholdResult.Correct, '%score% scenes out of %maximumScore% are active, you should aim for %ideal%'],
				[AnalyserThresholdResult.Low, 'Only  %score% scenes out of %maximumScore% are active, you should aim for %ideal%'],
				[AnalyserThresholdResult.CriticallyLow, 'Just %score% scenes out of %maximumScore% are active, you should aim for %ideal%'],
			])],
			[AnalyserDetailType.Duration, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.CriticallyHigh, 'Really, %percentage%% longer than your target'],
				[AnalyserThresholdResult.High, '%percentage%% longer than your target'],
				[AnalyserThresholdResult.Correct, '%percentage%% longer or shorter than your target'],
				[AnalyserThresholdResult.Low, '%percentage%% shorter than your target'],
				[AnalyserThresholdResult.CriticallyLow, '%percentage%% shorter than your target'],
			])],
			[AnalyserDetailType.Excitement, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.CriticallyHigh, '%score% are exciting, you should aim for %ideal%'],
				[AnalyserThresholdResult.High, '%score% are exciting, you should aim for %ideal%'],
				[AnalyserThresholdResult.Correct, '%score% are exciting, you should aim for %ideal%'],
				[AnalyserThresholdResult.Low, 'Only %score% are exciting, you should aim for %ideal%'],
				[AnalyserThresholdResult.CriticallyLow, 'Just %score% are exciting, you should aim for %ideal%'],
			])],
			[AnalyserDetailType.Interest, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.CriticallyLow, 'Really, %score% scenes type repeated in %maximumScore% scenes. Keep it below %ideal%.'],
				[AnalyserThresholdResult.Low, '%score% scenes type repeated in %maximumScore% scenes. Try to keep it below %ideal%'],
				[AnalyserThresholdResult.Correct, '%score% scenes type repeated in %maximumScore% scenes. Try to keep it below %ideal%'],
			])],
			[AnalyserDetailType.Variety, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.Correct, '%score% different type of scenes are used, you should aim for %ideal%'],
				[AnalyserThresholdResult.Low, 'Only %score% different type of scenes are used, you should aim for %ideal%'],
				[AnalyserThresholdResult.CriticallyLow, 'Just %score% different type of scenes are used, you should aim for %ideal%'],
			])],
		]);

	protected subtitles: Map<AnalyserDetailType, Map<AnalyserThresholdResult, string|undefined>> =
		new Map<AnalyserDetailType, Map<AnalyserThresholdResult, string | undefined>>([
			[AnalyserDetailType.Activity, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.CriticallyHigh, 'Too many active scenes'],
				[AnalyserThresholdResult.High, 'Maybe too many active scenes'],
				[AnalyserThresholdResult.Correct, 'The amount of active scenes is balanced'],
				[AnalyserThresholdResult.Low, 'Maybe not enough active scenes'],
				[AnalyserThresholdResult.CriticallyLow, 'Not enough active scenes'],
			])],
			[AnalyserDetailType.Duration, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.CriticallyHigh, 'The session is going to be too long'],
				[AnalyserThresholdResult.High, 'The session might be too long'],
				[AnalyserThresholdResult.Correct, 'The expected duration is in line with your target session duration'],
				[AnalyserThresholdResult.Low, 'The session might be short'],
				[AnalyserThresholdResult.CriticallyLow, 'The session is too short'],
			])],
			[AnalyserDetailType.Excitement, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.CriticallyHigh, 'Too much excitement'],
				[AnalyserThresholdResult.High, 'Maybe too much excitement'],
				[AnalyserThresholdResult.Correct, 'The amount of exciting time is balanced'],
				[AnalyserThresholdResult.Low, 'Maybe not enough excitement'],
				[AnalyserThresholdResult.CriticallyLow, 'Not enough excitement'],
			])],
			[AnalyserDetailType.Interest, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.CriticallyLow, 'Repetitive'],
				[AnalyserThresholdResult.Low, 'Maybe a bit repetitive'],
				[AnalyserThresholdResult.Correct, 'The scenes are not repetitive'],
			])],
			[AnalyserDetailType.Variety, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.Correct, 'There is a good variety of scenes'],
				[AnalyserThresholdResult.Low, 'Maybe not enough variety'],
				[AnalyserThresholdResult.CriticallyLow, 'Not enough variety'],
			])],
		]);

	constructor(
		app: App,
		public type: ComponentType,
	) {
		super(app);
	}

	abstract render(
		report: AnalyserReportInterface,
		containerEl: HTMLDivElement,
	): void;

	protected transformTime(
		duration: number|undefined,
	): string {
		if (duration === undefined)
			return '00:00';

		const hours: number = Math.floor(duration / (60 * 60));
		const minutes: number = Math.floor((duration - (hours * (60 * 60)))/60);
		return (hours < 10 ? '0' + hours.toString() : hours.toString()) +
			':' +
			(minutes < 10 ? '0' + minutes.toString() : minutes.toString());
	}

	protected prepareDescription(
		percentage: number,
		score: string|number,
		maximumScore: string|number,
		descriptionTemplate: string|undefined,
		ideal: string|number|undefined,
		type: ComponentType|undefined = undefined,
	): string {
		if (descriptionTemplate === undefined || descriptionTemplate === '') return '';

		let response = descriptionTemplate;

		if (percentage !== undefined)
			response = response.replace('%percentage%', percentage.toString());

		if (score !== undefined)
			response = response.replace('%score%', score.toString());

		if(maximumScore !== undefined)
			response = response.replace('%maximumScore%', maximumScore.toString());

		if (type !== undefined)
			response = response.replace('%type%', ComponentType[type]);

		if (ideal !== undefined)
			response = response.replace('%ideal%', ideal.toString());

		return response;
	}

	protected addThresholdClass(
		threshold: AnalyserThresholdResult,
		containerEl: HTMLElement,
	): void {
		switch (threshold){
			case AnalyserThresholdResult.CriticallyHigh:
				containerEl.addClass('perfect');
				break;
			case AnalyserThresholdResult.High:
				containerEl.addClass('balanced');
				break;
			case AnalyserThresholdResult.Low:
				containerEl.addClass('warning');
				break;
			case AnalyserThresholdResult.CriticallyLow:
				containerEl.addClass('error');
				break;
			case AnalyserThresholdResult.Correct:
				containerEl.addClass('normal');
				break;
		}
	}

	protected addThresholdErrorClass(
		threshold: AnalyserThresholdResult,
		containerEl: HTMLElement,
	): void {
		switch (threshold){
			case AnalyserThresholdResult.Correct:
				containerEl.addClass('perfect');
				break;
			case AnalyserThresholdResult.CriticallyHigh:
				containerEl.addClass('error');
				break;
			case AnalyserThresholdResult.High:
				containerEl.addClass('warning');
				break;
			case AnalyserThresholdResult.Low:
				containerEl.addClass('warning');
				break;
			case AnalyserThresholdResult.CriticallyLow:
				containerEl.addClass('error');
				break;
		}
	}
}
