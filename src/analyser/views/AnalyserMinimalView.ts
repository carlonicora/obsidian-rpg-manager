import {AnalyserDetailType} from "../enums/AnalyserDetailType";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {AbstractAnalyserView} from "./abstract/AbstractAnalyserView";
import {AnalyserReportInterface} from "../interfaces/AnalyserReportInterface";

export class AnalyserMinimalView extends AbstractAnalyserView {
	protected titles: Map<AnalyserDetailType|undefined,string> = new Map<AnalyserDetailType | undefined, string>([
		[undefined, 'Analysis score %percentage%%'],
		[AnalyserDetailType.Activity, 'Activity accuracy: %percentage%%'],
		[AnalyserDetailType.Duration, 'Duration accuracy: %percentage%%'],
		[AnalyserDetailType.Excitement, 'Excitement accuracy: %percentage%%'],
		[AnalyserDetailType.Interest, 'Interest accuracy: %percentage%%'],
		[AnalyserDetailType.Variety, 'Variety accuracy: %percentage%%'],
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
				[AnalyserThresholdResult.CriticallyHigh, 'Repetitive'],
				[AnalyserThresholdResult.High, 'Maybe a bit repetitive'],
				[AnalyserThresholdResult.Correct, 'The scenes are not repetitive'],
			])],
			[AnalyserDetailType.Variety, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.Correct, 'There is a good variety of scenes'],
				[AnalyserThresholdResult.Low, 'Maybe not enough variety'],
				[AnalyserThresholdResult.CriticallyLow, 'Not enough variety'],
			])],
		]);
	protected descriptions: Map<AnalyserDetailType|undefined, Map<AnalyserThresholdResult, string|undefined>> =
		new Map<AnalyserDetailType, Map<AnalyserThresholdResult, string | undefined>>([
			[AnalyserDetailType.Activity, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.CriticallyHigh, 'Really, %score% scenes out of %maximumScore% are active. Ideally you should have around %ideal% active scenes'],
				[AnalyserThresholdResult.High, '%score% scenes out of %maximumScore% are active. Ideally you should have around %ideal% active scenes'],
				[AnalyserThresholdResult.Low, 'Only  %score% scenes out of %maximumScore% are active. Ideally you should have around %ideal% active scenes'],
				[AnalyserThresholdResult.CriticallyLow, 'Just %score% scenes out of %maximumScore% are active. Ideally you should have around %ideal% active scenes'],
			])],
			[AnalyserDetailType.Duration, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.CriticallyHigh, 'Really, %percentage%% longer than your target'],
				[AnalyserThresholdResult.High, '%percentage%% longer than your target'],
				[AnalyserThresholdResult.Low, '%percentage%% shorter than your target'],
				[AnalyserThresholdResult.CriticallyLow, '%percentage%% shorter than your target'],
			])],
			[AnalyserDetailType.Excitement, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.CriticallyHigh, '%percentage%% of the running time (%score% scenes) is exciting. Ideally you should target the %ideal%%'],
				[AnalyserThresholdResult.High, '%percentage%% of the running time (%score% scenes) is exciting. Ideally you should target the %ideal%%'],
				[AnalyserThresholdResult.Low, 'only %percentage%% of the running time (%score% scenes) is exciting. Ideally you should target the %ideal%%'],
				[AnalyserThresholdResult.CriticallyLow, 'Just %percentage%% of the running time (%score% scenes) is exciting. Ideally you should target the %ideal%%'],
			])],
			[AnalyserDetailType.Interest, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.CriticallyHigh, 'Really, %score% scenes type repeated in %maximumScore% scenes. Keep it below %ideal%.'],
				[AnalyserThresholdResult.High, '%score% scenes type repeated in %maximumScore% scenes. Try to keep it below %ideal%'],
			])],
			[AnalyserDetailType.Variety, new Map<AnalyserThresholdResult, string|undefined>([
				[AnalyserThresholdResult.Low, 'Only %score% different type of scenes are used. Aim for %ideal%'],
				[AnalyserThresholdResult.CriticallyLow, 'Just %score% different type of scenes are used. Aim for %ideal%'],
			])],
		]);

	public render(
		report: AnalyserReportInterface,
		containerEl: HTMLDivElement,
	): void {
		if (!report.isValid) return;

		const analyserEl: HTMLDivElement = containerEl.createDiv({cls: 'rpgm-analyser'});

		const analyserHeadlineEl: HTMLSpanElement = analyserEl.createSpan({cls: 'header'});
		const description = this.descriptions.get(undefined)?.get(report.thresholdType);
		if (description !== undefined) {
			analyserHeadlineEl.textContent = this.prepareDescription(
				report.percentage,
				report.score,
				report.maximumScore,
				this.titles.get(undefined),
				report.ideal,
				this.type,
			)
		}

		/*
		if (report.actualDuration !== undefined && report.actualDuration !== 0){
			const actualDuration = this.transformTime(report.actualDuration);
			const actualDurationDescription = 'Actual ' + ComponentType[this.type] + ' duration: ' + actualDuration;
			analyserEl.createDiv().createSpan({cls: 'header', text: actualDurationDescription})
		}

		if (report.expectedDuration !== undefined && report.expectedDuration !== 0){
			const expectedDuration = this.transformTime(report.expectedDuration);
			let expectedDurationDescription = 'Expected ' + ComponentType[this.type] + ' duration: ' + expectedDuration;

			if (report.targetDuration !== undefined && report.targetDuration !== 0){
				const targetDuration = this.transformTime(report.targetDuration);
				expectedDurationDescription += ' (Your target is ' + targetDuration + ')';
			}

			analyserEl.createDiv().createSpan({cls: 'header', text: expectedDurationDescription})
		}


		this.addThresholdClass(report.thresholdType, analyserHeadlineEl);

		const analyserListEl: HTMLUListElement = analyserEl.createEl('ul');

		report.details.forEach((reportDetail: AnalyserReportDetailInterface) => {
			const descriptionTemplate: Array<string>|undefined = this.descriptions.get(reportDetail.detailType)?.get(reportDetail.thresholdType);

			if (descriptionTemplate !== undefined){
				const description = this.prepareDescription(reportDetail.percentage, reportDetail.score, reportDetail.maximumScore, descriptionTemplate[0], reportDetail.ideal);
				const analyserElementEl: HTMLLIElement = analyserListEl.createEl('li', {text: description});

				const extendedDescription = this.prepareDescription(reportDetail.percentage, reportDetail.score, reportDetail.maximumScore, descriptionTemplate[1], reportDetail.ideal);
				this.addThresholdErrorClass(reportDetail.thresholdType, analyserElementEl);
				analyserElementEl.createSpan({cls: 'description', text: extendedDescription});
			}
		});
		*/
	}
}
