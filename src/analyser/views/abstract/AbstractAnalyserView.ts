import {AbstractRpgManager} from "../../../abstracts/AbstractRpgManager";
import {App} from "obsidian";
import {AnalyserReportInterface} from "../../interfaces/AnalyserReportInterface";
import {AnalyserDetailType} from "../../enums/AnalyserDetailType";
import {AnalyserThresholdResult} from "../../enums/AnalyserThresholdResult";
import {AnalyserViewInterface} from "../../interfaces/AnalyserViewInterface";
import {AnalyserReportDetailInterface} from "../../interfaces/AnalyserReportDetailInterface";
import {ComponentType} from "../../../components/enums/ComponentType";

export abstract class AbstractAnalyserView extends AbstractRpgManager implements AnalyserViewInterface {
	protected titles: Map<AnalyserDetailType|undefined, string>;
	protected subtitles: Map<AnalyserDetailType|undefined, Map<AnalyserThresholdResult, string|undefined>>;
	protected descriptions: Map<AnalyserDetailType|undefined, Map<AnalyserThresholdResult, string|undefined>>;

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

	/*
	public render(
		report: AnalyserReportInterface,
		containerEl: HTMLDivElement,
	): void {
		if (!report.isValid) return;

		const analyserEl: HTMLDivElement = containerEl.createDiv({cls: 'rpgm-analyser'});

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

		const analyserHeadlineEl: HTMLSpanElement = analyserEl.createSpan({cls: 'header'});
		const description = this.descriptions.get(undefined)?.get(report.thresholdType);
		if (description !== undefined) {
			analyserHeadlineEl.textContent = this.prepareDescription(
				report.percentage,
				report.score,
				report.maximumScore,
				description[0],
				report.ideal,
				this.type,
			)
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
	}
	*/

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

		let response = descriptionTemplate
			.replace('%percentage%', percentage.toString())
			.replace('%score%', score.toString())
			.replace('%maximumScore%', maximumScore.toString())

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
		}
	}

	protected addThresholdErrorClass(
		threshold: AnalyserThresholdResult,
		containerEl: HTMLElement,
	): void {
		switch (threshold){
			case AnalyserThresholdResult.Correct:
				containerEl.addClass('balanced');
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
