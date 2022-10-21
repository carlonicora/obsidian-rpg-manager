import {AnalyserReportInterface} from "../interfaces/AnalyserReportInterface";
import {AnalyserVisualView} from "./AnalyserVisualView";
import {AnalyserReportDetailInterface} from "../interfaces/AnalyserReportDetailInterface";
import {AnalyserDetailType} from "../enums/AnalyserDetailType";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {AnalyserScoreType} from "../enums/AnalyserScoreType";
import {ComponentType} from "../../components/enums/ComponentType";

export class AnalyserSceneBuilderView extends AnalyserVisualView {
	private _extendedDescription: Map<AnalyserDetailType, Map<AnalyserThresholdResult, string>> = new Map<AnalyserDetailType, Map<AnalyserThresholdResult, string>>([
		[AnalyserDetailType.Activity,
			new Map<AnalyserThresholdResult, string>([
				[AnalyserThresholdResult.CriticallyHigh, 'Activity\nToo high'],
				[AnalyserThresholdResult.High, 'Activity\nHigh'],
				[AnalyserThresholdResult.Correct, 'Activity'],
				[AnalyserThresholdResult.Low, 'Activity\nLow'],
				[AnalyserThresholdResult.CriticallyLow, 'Activity\nToo low'],
			])
		],
		[AnalyserDetailType.Excitement,
			new Map<AnalyserThresholdResult, string>([
				[AnalyserThresholdResult.CriticallyHigh, 'Excitement\nToo high'],
				[AnalyserThresholdResult.High, 'Excitement\nHigh'],
				[AnalyserThresholdResult.Correct, 'Excitement'],
				[AnalyserThresholdResult.Low, 'Excitement\nLow'],
				[AnalyserThresholdResult.CriticallyLow, 'Excitement\nToo low'],
			])
		],
		[AnalyserDetailType.Interest,
			new Map<AnalyserThresholdResult, string>([
				[AnalyserThresholdResult.CriticallyHigh, 'Interest'],
				[AnalyserThresholdResult.High, 'Interest'],
				[AnalyserThresholdResult.Correct, 'Interest'],
				[AnalyserThresholdResult.Low, 'Interest\nLow'],
				[AnalyserThresholdResult.CriticallyLow, 'Interest\nToo low'],
			])
		],
		[AnalyserDetailType.Variety,
			new Map<AnalyserThresholdResult, string>([
				[AnalyserThresholdResult.CriticallyHigh, 'Variety'],
				[AnalyserThresholdResult.High, 'Variety'],
				[AnalyserThresholdResult.Correct, 'Variety'],
				[AnalyserThresholdResult.Low, 'Variety\nLow'],
				[AnalyserThresholdResult.CriticallyLow, 'Variety\nToo low'],
			])
		],
	])

	private _fixEl: HTMLDivElement;

	public render(
		report: AnalyserReportInterface,
		containerEl: HTMLDivElement,
	): void {
		if (!report.isValid) return;

		const analyserEl: HTMLDivElement = containerEl.createDiv({cls: 'rpgm-new-analyser centred'});

		const analyserContainerEl: HTMLDivElement = analyserEl.createDiv({cls: 'analyser-container clearfix'});

		this.addCircle(analyserContainerEl, report.percentage, report.thresholdType, true, 'Score');

		report.details.forEach((reportDetail: AnalyserReportDetailInterface) => {
			if (reportDetail.isRelevant === false) return;
			const circleEl = this.addCircle(
				analyserContainerEl,
				reportDetail.percentage,
				reportDetail.thresholdType,
				reportDetail.isHighBetter,
				this._extendedDescription.get(reportDetail.detailType)?.get(reportDetail.thresholdType) ?? ''
			);

			circleEl.addEventListener('mouseover', () => {
				this._showFix(reportDetail);
			})

			circleEl.addEventListener('mouseout', () => {
				this._showExpectedDuration(report);
			});
		});

		this._fixEl = analyserEl.createDiv({cls: 'analyser-container-fix'})
		this._showExpectedDuration(report);
	}

	private async _showExpectedDuration(
		report: AnalyserReportInterface,
	): Promise<void> {
		this._fixEl.removeClasses(['error', 'warning', 'balanced', 'perfect', 'normal']);
		if (report.expectedDuration !== undefined && report.expectedDuration !== 0) {
			const expectedDuration = this.transformTime(report.expectedDuration);
			this._fixEl.textContent = 'Expected duration: ' + expectedDuration;
		} else {
			this._fixEl.textContent = '';
		}



		this.addThresholdClass(AnalyserThresholdResult.Correct, this._fixEl);
	}

	private async _showFix(
		reportDetail: AnalyserReportDetailInterface,
	): Promise<void> {
		this._fixEl.removeClasses(['error', 'warning', 'balanced', 'perfect', 'normal']);
		let description = '';
		if (reportDetail.scoreType === AnalyserScoreType.Percentage)
			description = this.prepareDescription(
				reportDetail.percentage,
				reportDetail.score,
				reportDetail.maximumScore,
				this.descriptions.get(reportDetail.detailType)?.get(reportDetail.thresholdType),
				reportDetail.ideal,
			);
		else if (reportDetail.scoreType === AnalyserScoreType.Time)
			description = this.prepareDescription(
				reportDetail.percentage,
				this.transformTime(reportDetail.score),
				this.transformTime(reportDetail.maximumScore),
				this.descriptions.get(reportDetail.detailType)?.get(reportDetail.thresholdType),
				this.transformTime(reportDetail.ideal),
			);

		if (description !== '') {
			if (reportDetail.isHighBetter){
				this.addThresholdClass(reportDetail.thresholdType, this._fixEl);
			} else {
				this.addThresholdErrorClass(reportDetail.thresholdType, this._fixEl);
			}

			this._fixEl.textContent = description;
		}
	}
}
