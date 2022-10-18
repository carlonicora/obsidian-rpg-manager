import {AnalyserDetailType} from "../enums/AnalyserDetailType";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {AbstractAnalyserView} from "./abstract/AbstractAnalyserView";
import {AnalyserReportInterface} from "../interfaces/AnalyserReportInterface";
import {ComponentType} from "../../components/enums/ComponentType";
import {AnalyserReportDetailInterface} from "../interfaces/AnalyserReportDetailInterface";
import {AnalyserScoreType} from "../enums/AnalyserScoreType";

export class AnalyserExtendedView extends AbstractAnalyserView {
	protected titles: Map<AnalyserDetailType|undefined,string> = new Map<AnalyserDetailType | undefined, string>([
		[undefined, 'Analysis score %percentage%%'],
		[AnalyserDetailType.Activity, 'Activity accuracy: %percentage%%'],
		[AnalyserDetailType.Duration, 'Plotted duration accuracy: %percentage%%'],
		[AnalyserDetailType.Excitement, 'Excitement accuracy: %percentage%%'],
		[AnalyserDetailType.Interest, 'Interest accuracy: %percentage%%'],
		[AnalyserDetailType.Variety, 'Variety accuracy: %percentage%%'],
		[AnalyserDetailType.Timing, 'Timing accuracy: %percentage%%'],
	]);


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

	public render(
		report: AnalyserReportInterface,
		containerEl: HTMLDivElement,
	): void {
		if (!report.isValid) return;

		const analyserEl: HTMLDivElement = containerEl.createDiv({cls: 'rpgm-new-analyser'});

		this._addHeaderElement(report, analyserEl);

		const analyserListEl: HTMLUListElement = analyserEl.createEl('ul');
		this._addTimingElements(report, analyserListEl);

		report.details.forEach((reportDetail: AnalyserReportDetailInterface) => {
			this._addDetailElement(reportDetail, analyserListEl);
		});
	}

	private _addDetailElement(
		reportDetail: AnalyserReportDetailInterface,
		containerEl: HTMLUListElement,
	): void {
		if (reportDetail.isRelevant === false) return;

		const analyserListElementEl: HTMLLIElement = containerEl.createEl('li');
		const title = this.prepareDescription(
				reportDetail.percentage,
				reportDetail.score,
				reportDetail.maximumScore,
				this.titles.get(reportDetail.detailType),
				reportDetail.ideal,
		);

		if (title !== undefined) {
			const subtitleEl = analyserListElementEl.createSpan({cls: 'subtitle', text: title});
			if (reportDetail.isHighBetter){
				this.addThresholdClass(reportDetail.thresholdType, subtitleEl);
			} else {
				this.addThresholdErrorClass(reportDetail.thresholdType, subtitleEl);
			}
		}

		const subtitle = this.prepareDescription(
			reportDetail.percentage,
			reportDetail.score,
			reportDetail.maximumScore,
			this.subtitles.get(reportDetail.detailType)?.get(reportDetail.thresholdType),
			reportDetail.ideal,
		);

		const analyserListEl: HTMLUListElement = analyserListElementEl.createEl('ul');
		if (subtitle !== undefined && subtitle !== '')
			analyserListEl.createEl('li', {text: subtitle});

		if (reportDetail.percentage !== 100) {
			let detail: string | undefined = undefined;

			if (reportDetail.scoreType === AnalyserScoreType.Percentage)
				detail = this.prepareDescription(
					reportDetail.percentage,
					reportDetail.score,
					reportDetail.maximumScore,
					this.descriptions.get(reportDetail.detailType)?.get(reportDetail.thresholdType),
					reportDetail.ideal,
				);
			else if (reportDetail.scoreType === AnalyserScoreType.Time)
				detail = this.prepareDescription(
					reportDetail.percentage,
					this.transformTime(reportDetail.score),
					this.transformTime(reportDetail.maximumScore),
					this.descriptions.get(reportDetail.detailType)?.get(reportDetail.thresholdType),
					this.transformTime(reportDetail.ideal),
				);

			if (detail !== undefined && detail !== '')
				analyserListEl.createEl('li', {text: detail});
		}
	}

	private _addTimingElements(
		report: AnalyserReportInterface,
		containerEl: HTMLUListElement,
	): void {
		const analyserListTimingElementEl: HTMLLIElement = containerEl.createEl('li');

		if (report.durationPercentage !== 0 && !isNaN(report.durationPercentage)) {
			const detail = this.prepareDescription(
				report.durationPercentage,
				0,
				0,
				this.titles.get(AnalyserDetailType.Timing),
				0,
			);
			const timingTitleEl = analyserListTimingElementEl.createSpan({cls: 'subtitle', text: detail})
			this.addThresholdClass(report.durationThreshold, timingTitleEl);
			//this.addThresholdErrorClass(report.durationThreshold, timingTitleEl);
		} else {
			analyserListTimingElementEl.createSpan({cls: 'subtitle', text: 'Time Analysis'})
		}

		const timingEl: HTMLDivElement = analyserListTimingElementEl.createDiv();
		const timingListEl: HTMLUListElement = timingEl.createEl('ul');

		if (report.actualDuration !== undefined && report.actualDuration !== 0){
			const actualDurationEl = timingListEl.createEl('li');

			const actualDuration = this.transformTime(report.actualDuration);
			const actualDurationDescription = 'Actual ' + ComponentType[this.type] + ' duration: ' + actualDuration;

			actualDurationEl.createSpan({cls: 'description', text: actualDurationDescription})
		}

		if (report.expectedDuration !== undefined && report.expectedDuration !== 0){
			const expectedDurationEl = timingListEl.createEl('li');

			const expectedDuration = this.transformTime(report.expectedDuration);
			const expectedDurationDescription = 'Expected ' + ComponentType[this.type] + ' duration: ' + expectedDuration;

			expectedDurationEl.createSpan({cls: 'description', text: expectedDurationDescription})

			if (report.targetDuration !== undefined && report.targetDuration !== 0){
				const targetDurationEl = timingListEl.createEl('li');

				const targetDuration = this.transformTime(report.targetDuration);
				const targetDurationDescription = 'Target duration: ' + targetDuration;

				targetDurationEl.createSpan({cls: 'description', text: targetDurationDescription})
			}
		}
	}

	private _addHeaderElement(
		report: AnalyserReportInterface,
		containerEl: HTMLDivElement,
	): void {
		const analyserHeadlineEl: HTMLSpanElement = containerEl.createSpan({cls: 'header'});
		analyserHeadlineEl.textContent = this.prepareDescription(
			report.percentage,
			report.score,
			report.maximumScore,
			this.titles.get(undefined),
			report.ideal,
			this.type,
		);
		this.addThresholdClass(report.thresholdType, analyserHeadlineEl);
	}
}
