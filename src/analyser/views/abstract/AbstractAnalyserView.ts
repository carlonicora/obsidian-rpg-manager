import {AbstractRpgManager} from "../../../abstracts/AbstractRpgManager";
import {App} from "obsidian";
import {AnalyserReportInterface} from "../../interfaces/AnalyserReportInterface";
import {AnalyserDetailType} from "../../enums/AnalyserDetailType";
import {AnalyserThresholdResult} from "../../enums/AnalyserThresholdResult";
import {AnalyserViewInterface} from "../../interfaces/AnalyserViewInterface";
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
