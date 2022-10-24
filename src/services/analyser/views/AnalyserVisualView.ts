import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";
import {AbstractAnalyserView} from "./abstract/AbstractAnalyserView";
import {AnalyserReportInterface} from "../interfaces/AnalyserReportInterface";
import {AnalyserReportDetailInterface} from "../interfaces/AnalyserReportDetailInterface";
import {AnalyserDetailType} from "../enums/AnalyserDetailType";
import {Component, MarkdownRenderer} from "obsidian";

export class AnalyserVisualView extends AbstractAnalyserView {
	private _description: Map<AnalyserDetailType|undefined, string> = new Map<AnalyserDetailType | undefined, string>([
		[undefined, 'Score'],
		[AnalyserDetailType.Activity, 'Activity'],
		[AnalyserDetailType.Duration, 'Duration'],
		[AnalyserDetailType.Excitement, 'Excitement'],
		[AnalyserDetailType.Interest, 'Interest'],
		[AnalyserDetailType.Variety, 'Variety'],
		[AnalyserDetailType.Timing, 'Timing'],
	])

	public render(
		report: AnalyserReportInterface,
		containerEl: HTMLDivElement,
	): void {
		if (!report.isValid) return;

		const analyserEl: HTMLDivElement = containerEl.createDiv({cls: 'rpgm-new-analyser centred'});

		const analyserContainerEl: HTMLDivElement = analyserEl.createDiv({cls: 'analyser-container clearfix'});

		this.addCircle(analyserContainerEl, report.percentage, report.thresholdType, true, 'Score');

		if (report.durationPercentage === 0 && isNaN(report.durationPercentage))
			this.addCircle(analyserContainerEl, report.durationPercentage, report.durationThreshold, true, this._description.get(undefined) ?? '');

		report.details.forEach((reportDetail: AnalyserReportDetailInterface) => {
			if (reportDetail.isRelevant === false) return;
			this.addCircle(analyserContainerEl, reportDetail.percentage, reportDetail.thresholdType, reportDetail.isHighBetter, this._description.get(reportDetail.detailType) ?? '');
		});
	}

	protected addCircle(
		containerEl: HTMLDivElement,
		percentage: number,
		threshold: AnalyserThresholdResult,
		isHigerBetter: boolean,
		description: string,
	): HTMLDivElement {
		const response = containerEl.createDiv({cls: 'circle-container'});

		const circleEl = response.createDiv({cls:' c100 p' + percentage.toString() + ' small'});
		circleEl.createSpan({text: percentage.toString() + '%'});

		const sliceEl = circleEl.createDiv({cls: 'slice'});
		sliceEl.createDiv({cls: 'bar'});
		sliceEl.createDiv({cls: 'fill'});

		//const circleDescriptionEl: HTMLDivElement = circleContainerEl.createDiv({cls: 'description', text:description});
		const circleDescriptionEl: HTMLDivElement = response.createDiv({cls: 'description'});

		MarkdownRenderer.renderMarkdown(
			description,
			circleDescriptionEl,
			'',
			null as unknown as Component,
		);

		if (isHigerBetter) {
			this.addThresholdClass(threshold, circleEl);
			this.addThresholdClass(threshold, circleDescriptionEl);
		} else {
			this.addThresholdErrorClass(threshold, circleEl);
			this.addThresholdErrorClass(threshold, circleDescriptionEl);
		}

		return response;
	}
}
